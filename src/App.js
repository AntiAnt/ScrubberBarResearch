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
  const vidTimeControls = 5;
  const [recordState, setRecordState] = useState(false)

  const HandleKeyUp = (event) => {
    if (event.key.toLowerCase() === "s"){
      getStopTimeStamp()
      setRecordState(false)
    }
  }

  const HandleKeyDown = (event) => {
    switch (event.key.toLowerCase()){
      case "s":
        getStartTimeStamp()
        setRecordState(true)
        break;
      case "j":
        video.current.currentTime -= vidTimeControls
        break;
      case "k":
        video.current.paused ? video.current.play() : video.current.pause();
        break;
      case "l":
        video.current.currentTime += vidTimeControls
        break;
    }
  }

  useEffect(() => {
    if (video.current) {
      setVideoDuration(video.current.duration);
    }
  },[video]);

  function getStartTimeStamp(){
    if(!!video){
      setStartPos(video.current.currentTime*increment);
    }
  }

  function getStopTimeStamp(){
    if(!!video){
      setStopPos(video.current.currentTime*increment);
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
    if (video.current.paused === true) {
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

  const SetPlayBackSpeed = (id) => {
    switch (id){
      case "1x":
        video.current.playbackRate = 1.0;
        break;
      case "2x":
        video.current.playbackRate = 2.0;
        break;
      case "4x":
        video.current.playbackRate = 4;
        break;
      case ".5x":
        video.current.playbackRate = .5;
        break;
      case ".25x":
        video.current.playbackRate = .25;
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <video controls width="1000" ref={video} onKeyDown={HandleKeyDown} onKeyUp={HandleKeyUp} onTimeUpdate={() => {
          calcTime();
          loop();
        }}>
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" type="video/mp4"></source>
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
          <div style={{
            display:"inline"
          }}>
            <button id={"1x"} onClick={() => SetPlayBackSpeed("1x")}>1x speed</button>
            <button id={"2x"} onClick={() => SetPlayBackSpeed("2x")}>2x speed</button>
            <button id={".5"} onClick={() => SetPlayBackSpeed(".5x")}>.5x speed</button>
            <button id={".25"} onClick={() => SetPlayBackSpeed(".25x")}>.25x speed</button>
            <button id={"3x"} onClick={() => SetPlayBackSpeed("4x")}>4x speed</button>

          </div>

        { recordState === true &&
            <div>
              <h1>🔴 Time Frame Recording!</h1>
            </div>
        }
          <p>Scrub forward +5 second with "L" key and back -5 seconds with "J" key. Play/Pause with "K" key.</p>
      </header>
    </div>
  );
}
export default App;