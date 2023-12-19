import './App.css';
import MouseParticleTrail from './components/MouseTrail';

function App() {

  {
    //experiment with different size for floating space
  }

  return (




    <main>
      <MouseParticleTrail floatingSpace="90" orbSize="3" style={{position:"fixed", zIndex:"-99"}}/>
    </main>
  );
}

export default App;
