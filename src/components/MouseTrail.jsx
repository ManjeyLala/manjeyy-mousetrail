import React, { useEffect, useRef } from "react";



export default function MouseTrail({floatingSpace , orbSize}) {
    const fs = Number(floatingSpace);
    console.log(Number( Number(floatingSpace) ))
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        let particles = [];
        const devicePixelRatio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasContext.scale(devicePixelRatio, devicePixelRatio);
        const randomColor = () => {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return `rgb(${r},${g},${b})`;
        };
        var hue = 0;
        const createParticle = (x, y) => {
            const size = orbSize;
            const color = `hsl(${hue},100%,50%)`;
            const speedX = Math.random() * 2 - 1;
            const speedY = Math.random() * 2 - 1;
            return { x, y, size, color, speedX, speedY };
        };
        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.hypot(dx, dy);
                    if (distance <= fs ) {
                        const opacity = 1 - distance / fs;
                        canvasContext.globalAlpha = opacity;
                        canvasContext.strokeStyle = particles[i].color;
                        canvasContext.beginPath();
                        canvasContext.moveTo(particles[i].x, particles[i].y);
                        canvasContext.lineTo(particles[j].x, particles[j].y);
                        canvasContext.stroke();
                    }
                }
            }
        };
        const animate = () => {
            requestAnimationFrame(animate);
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            hue++;
            connectParticles();
            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.size -= 0.05;
                if (particle.size <= 0.3) {
                    particles.splice(index, 1);
                }
                canvasContext.fillStyle = particle.color;
                canvasContext.beginPath();
                canvasContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                canvasContext.fill();
            });
        };
        animate();
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            for (let i = 0; i < 1; i++) {
                particles.push(createParticle(x, y));
            }
        };
        canvas.addEventListener("mousemove", handleMouseMove);
        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return <canvas ref={canvasRef} className="particle-canvas" />;
};