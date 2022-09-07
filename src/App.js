import { useEffect, useState } from "react";
import { ScrubberBar } from "./scrubber-bar-component";


const App = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    if (playState && elapsedTime < 100) {
      updateTime();
    }
  },[elapsedTime, playState]);

  const updateTime = async () => {
    const delay = await new Promise(resolve => setTimeout(resolve, 1000))
    setElapsedTime(elapsedTime + 1);
  }

  const handleTimer = () => {
    setPlayState(!playState);
  }

  return (
    <div className="App">
      <dt>current time</dt>
      <dd>{elapsedTime} sec</dd>
      <ScrubberBar elapsedTime={elapsedTime} />
      <button
        onClick={handleTimer}
      >
        {playState ? "pause" : "play"}
      </button>
    </div>
  );
}

export default App;
