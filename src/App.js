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
  const [stopTime, setStopTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  let currTime = null;
  const [listOfStartStop, setListOfStartStop] = useState([]);
  const increment = 50/videoDuration;

  useEffect(() => {
    if (video.current) {
      setVideoDuration(video.current.duration);
    }
  },[video]);

  function getStartTimeStamp(){
    if(!!video){
      setStartPos(video.current.currentTime*increment);
      console.log("Start Pos Set: "+video.current.currentTime);

    }
  }

  function getStopTimeStamp(){
    if(!!video){
      setStopPos(video.current.currentTime*increment);
      console.log("Stop pos set: "+video.current.currentTime);
      const posPair = {
        "startPos":startPos,
        "stopPos":video.current.currentTime*increment
      };
      listOfStartStop.push(posPair);
      setListOfStartStop([...listOfStartStop]);
      clearPos();
    }
  }

  function setTimes(i){
    let interval = listOfStartStop[i];
    setStartTime(interval["startPos"]/increment);
    setStopTime(interval["stopPos"]/increment);
    video.current.currentTime = startTime;
  }

  function loop(){
    if(startTime !== 0 && stopTime!== 0){
      if(video.current.currentTime >= stopTime){
        video.current.currentTime = startTime;
      }
    }
  }

  function clearPos(){
    setStartPos(0);
    setStopPos(0);
  }

  function onPlay(){
    if (video.current.paused == true) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }

  function calcTime(){
    // Calculate the slider value
    setElapsedTime(video.current.currentTime*increment);
  } 

  function clearTime(){
    setStartTime(0);
    setStopTime(0);
    video.current.currentTime = startTime;
  }

  const handleTimer = () => {
    setPlayState(!playState);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Video App</p>
          <video controls width="1000" ref={video} onTimeUpdate={() => {
          calcTime();
          loop();
        }}>
          <source src="flower.webm" type="video/webm"></source>
          </video>

          <div id="video-controls">
            <button type="button" id="play-pause" onClick={() => {
            handleTimer();
            onPlay();
            }}>{playState ? "pause" : "play"}</button>
             <ScrubberBar elapsedTime={elapsedTime} posList={listOfStartStop} eventspot={setTimes} onTimeUpdate={loop}/>
          </div>
          <button id="startTimeButton" onClick={getStartTimeStamp}>Set Start Timestamp</button>
          <button id="stopTimeButton" onClick={getStopTimeStamp}>Set Stop Timestamp</button>
          <button id="clearLoopButton" onClick={clearTime}>Clear Loop</button>
          
      </header>
    </div>
  );
};
export default App;