import './App.css';
import Home from './views/Home';
import { useState, useEffect } from 'react';

function App() {
  // Usage

  const animation1 = useAnimation('elastic', 600, 0);
  const animation2 = useAnimation('elastic', 600, 150);
  const animation3 = useAnimation('elastic', 600, 300);
  return (
    <>
      <Home />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Ball
          innerStyle={{
            marginTop: animation1 * 200 - 100,
          }}
        />
        <Ball
          innerStyle={{
            marginTop: animation2 * 200 - 100,
          }}
        />
        <Ball
          innerStyle={{
            marginTop: animation3 * 200 - 100,
          }}
        />
      </div>
    </>
  );
}
const Ball = ({ innerStyle }) => (
  <div
    style={{
      width: 200,
      height: 200,
      marginRight: '40px',
      borderRadius: '100%',
      backgroundImage: `url('pokeball2.png')`,
      backgroundPosition: 'center',
      ...innerStyle,
    }}
  />
);
function useAnimation(easingName = 'linear', duration = 500, delay = 0) {
  const elapsed = useAnimationTimer(duration, delay);
  const n = Math.min(1, elapsed / duration);
  return easing[easingName](n);
}
const easing = {
  linear: (n) => n,
  elastic: (n) => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
};
function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);
  useEffect(() => {
    let animationFrame, timerStop, start;
    function onFrame() {
      setTime(Date.now() - start);
      loop();
    }
    function loop() {
      animationFrame = requestAnimationFrame(onFrame);
    }
    function onStart() {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        setTime(Date.now() - start);
      }, duration);
      start = Date.now();
      loop();
    }
    const timerDelay = setTimeout(onStart, delay);
    return () => {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, delay]);
  return elapsed;
}

export default App;
