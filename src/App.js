import './App.css';
import React,{useState} from 'react';
import { ScrubberBar } from "./scrubber-bar-component";


function App() {
  const video = React.createRef(null);
  const seekBarRef = React.createRef(null);
  const timer = React.createRef(null);
  const [stopTime, setStopTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  let currTime = null;
  const [buttonText, setButtonText] = useState('Get Timestamp')

  function getTimeStamp(){
    if(!!video){
      currTime=video.current.currentTime;
      console.log(currTime);
      setButtonText('Get timestamp: '+currTime);
    }
  }

  function getStartTimeStamp(){
    if(!!video){
      setStartTime(video.current.currentTime);
    }
  }

  function getStopTimeStamp(){
    if(!!video){
      setStopTime(video.current.currentTime);
    }
  }

  function loop(e){
    if (startTime !== null && stopTime !== null){
      if(video.current.currentTime >= stopTime){
        video.current.currentTime = startTime;
      }
    }
  }

  function clearTimeStamps(){
    setStartTime(null);
    setStopTime(null);
  }

  function onPlay(){
    if (video.current.paused == true) {
      video.current.play();
      document.getElementById('play-pause').innerHTML="Pause";
    } else {
      video.current.pause();
      document.getElementById('play-pause').innerHTML="Play";
    }
  }

  function seekBar(){
    // Calculate the new time
    var time = video.current.duration * (seekBarRef.current.value / 100);
    // Update the video time
    video.current.currentTime = time;
  }

  function updateSeekbar(){
    // Calculate the slider value
    var value = Math.round((video.current.currentTime / video.current.duration) * 100);
    timer.current.innerHTML=(video.current.currentTime) + " seconds";
    // Update the slider value
    seekBarRef.current.value = value;
  }

  function whenMousedown(){
    video.current.pause();
  }

  function whenMouseup(){
    video.current.play();
  }
// below we are replacing the onTimeUpdate for video with seekBar instead of loop
  return (
    <div className="App">
      <header className="App-header">
        <p>Video App</p>
          <video controls width="1000" ref={video} onTimeUpdate={() => {
          loop();
          updateSeekbar();
        }}>
          <source src="flower.webm" type="video/webm"></source>
          </video>

          <div id="video-controls">
            <button type="button" id="play-pause" onClick={onPlay}>Play</button>
            <label id="timer" for="range" role="timer" ref={timer}></label>
            {/* <div class="scrub-bar" role='group' aria-labelledby='multi-lbl'>
              <input type="range" id="seek-bar" value="0" ref={seekBarRef} onChange={seekBar} onMouseDown={whenMousedown} onMouseUp={whenMouseup}></input>
              <input type="range" id="seek-bar-start" value="0" onMouseDown={whenMousedown} onMouseUp={whenMouseup}></input>
              <input type="range" id="seek-bar-start" value="100" onMouseDown={whenMousedown} onMouseUp={whenMouseup}></input>
            </div> */}
             <ScrubberBar elapsedTime={updateSeekbar} />
          </div>

          <button id="startTimeButton" onClick={getStartTimeStamp}>Set Start Timestamp</button>
          <button id="stopTimeButton" onClick={getStopTimeStamp}>Set Stop Timestamp</button>
          <div>start: {startTime}</div>
          <div>stop: {stopTime}</div>
          <button onClick={clearTimeStamps}>Clear time stamps</button>
      </header>
    </div>
  );
};
export default App;