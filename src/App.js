import './App.css';
import React,{useEffect,useState} from 'react';
import { ScrubberBar } from "./scrubber-bar-component";


function App() {
  const video = React.createRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const[videoDuration,setVideoDuration] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [stopPos, setStopPos] = useState(0);
  const [startPos, setStartPos] = useState(0);
  let currTime = null;

  useEffect(() => {
    if (video.current) {
      setVideoDuration(video.current.duration);
    }
  },[video]);

  function getTimeStamp(){
    if(!!video){
      currTime=video.current.currentTime;
      console.log(currTime);
    }
  }

  function getStartTimeStamp(){
    if(!!video){
      var increment = 50/videoDuration;
      setStartPos(video.current.currentTime*increment);
      console.log(video.current.currentTime);
    }
  }

  function getStopTimeStamp(){
    if(!!video){
      var increment = 50/videoDuration;
      setStopPos(video.current.currentTime*increment);
      console.log(video.current.currentTime);
    }
  }

  /* function loop(e){
    if (startTime !== null && stopTime !== null){
      if(video.current.currentTime >= stopTime){
        video.current.currentTime = startTime;
      }
    }
  } */

  function clearTimeStamps(){
    setStartPos(null);
    setStopPos(null);
  }

  function onPlay(){
    if (video.current.paused == true) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }
/* 
  function seekBar(){
    // Calculate the new time
    var time = video.current.duration * (seekBarRef.current.value / 100);
    // Update the video time
    video.current.currentTime = time;
  }
*/
  function calcTime(){
    // Calculate the slider value
    var increment = 50/videoDuration;
    setElapsedTime(video.current.currentTime*increment);
  } 

  function whenMousedown(){
    video.current.pause();
  }

  function whenMouseup(){
    video.current.play();
  }

  const handleTimer = () => {
    setPlayState(!playState);
  }
// below we are replacing the onTimeUpdate for video with seekBar instead of loop
  return (
    <div className="App">
      <header className="App-header">
        <p>Video App</p>
          <video controls width="1000" ref={video} onTimeUpdate={() => {
          calcTime();
        }}>
          <source src="flower.webm" type="video/webm"></source>
          </video>

          <div id="video-controls">
            <button type="button" id="play-pause" onClick={() => {
            handleTimer();
            onPlay();
            }}>{playState ? "pause" : "play"}</button>
             <ScrubberBar elapsedTime={elapsedTime} startTime={startPos} stopTime={stopPos} />
          </div>
          <button id="startTimeButton" onClick={getStartTimeStamp}>Set Start Timestamp</button>
          <button id="stopTimeButton" onClick={getStopTimeStamp}>Set Stop Timestamp</button>
      </header>
    </div>
  );
};
export default App;