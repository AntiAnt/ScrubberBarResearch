import "./App.css";
import React, { useEffect, useState } from "react";
import { ScrubberBar } from "./scrubber-bar-component";
import { VidModal } from "./modal";

function App() {
  const video = React.createRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [stopPos, setStopPos] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [stopTime, setStopTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [listOfStartStop, setListOfStartStop] = useState([]);
  const increment = 50 / videoDuration;
  const vidTimeControls = 5;
  const [recordState, setRecordState] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const defaultPlaybackRate = 2.0
  const defaultVidSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const HandleKeyUp = (event) => {
    if (event.key.toLowerCase() === "s") {
      getStopTimeStamp();
      setRecordState(false);
    }
  };

  //TODO conditions to check if the modal is open and all the states of recording time frame feature
  // in the background should be set to their default state
  const HandleKeyDown = (event) => {
    switch (event.key.toLowerCase()) {
      case "s":
        if (recordState !== true) {
          setStartPos(video.current.currentTime * increment);
        }
        setRecordState(true);
        break;
      case "j":
        video.current.currentTime -= vidTimeControls;
        break;
      case "k":
        handlePlayClick();
        break;
      case "l":
        video.current.currentTime += vidTimeControls;
        break;
      case "c":
        clearTime();
        break;
      case "f":
        setModalIsOpenToTrue();
        break;
      case "x":
        setModalIsOpenToFalse();
        break;
    }
  };

  useEffect(() => {
    video.current.playbackRate = defaultPlaybackRate;
    if (video.current) {
      setVideoDuration(video.current.duration);
    }
  }, [video]);

  function getStartTimeStamp() {
    if (!!video) {
      setStartPos(video.current.currentTime * increment);
    }
  }

  function getStopTimeStamp() {
    if (!!video) {
      setStopPos(video.current.currentTime * increment);
      const posPair = {
        startPos: startPos,
        stopPos: video.current.currentTime * increment,
      };
      listOfStartStop.push(posPair);
      setListOfStartStop([...listOfStartStop]);
      clearPos();
    }
  }

  function setTimes(i) {
    let interval = listOfStartStop[i];
    setStartTime(interval["startPos"] / increment);
    setStopTime(interval["stopPos"] / increment);
    video.current.currentTime = startTime;
  }

  function loop() {
    if (startTime !== 0 && stopTime !== 0) {
      if (video.current.currentTime >= stopTime) {
        video.current.currentTime = startTime;
      }
    }
  }

  function clearPos() {
    setStartPos(0);
    setStopPos(0);
  }

  function handlePlayClick() {
    if (video.current.paused === true) {
      video.current.play();
      setPlayState(true);
    } else {
      video.current.pause();
      setPlayState(false);
    }
  }

  function calcTime() {
    // Calculate the slider value
    setElapsedTime(video.current.currentTime * increment);
  }

  function clearTime() {
    setStartTime(0);
    setStopTime(0);
    video.current.currentTime = startTime;
  }

  function playTime() {
    return video.current.currentTime;
  }
  const SetPlayBackSpeed = (id) => {
    switch (id) {
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
        video.current.playbackRate = 0.5;
        break;
      case ".25x":
        video.current.playbackRate = 0.25;
        break;
      default:
        video.current.playbackRate = 2.0;
    }
  };



  return (
    <div className="App App-header">
      <video
        controls
        width="1000"
        ref={video}
        onKeyDown={HandleKeyDown}
        onKeyUp={HandleKeyUp}
        onTimeUpdate={() => {
          calcTime();
          loop();
        }}
      >
        <source
          src={defaultVidSource}
          type="video/mp4"
        ></source>
      </video>
      <div id="video-controls">
        <button type="button" id="play-pause" onClick={handlePlayClick}>
          {playState ? "pause" : "play"}
        </button>
        <ScrubberBar
          elapsedTime={elapsedTime}
          posList={listOfStartStop}
          eventspot={setTimes}
          onTimeUpdate={loop}
        />
      </div>
      <button id="startTimeButton" onClick={getStartTimeStamp}>
        Set Start Timestamp or Press "S" key
      </button>
      <button id="stopTimeButton" onClick={getStopTimeStamp}>
        Set Stop Timestamp or Release "S" key
      </button>
      <button id="clearLoopButton" onClick={clearTime}>
        Clear Loop or Press the "C" key
      </button>
      <button></button>
      {/*TODO make a slider for the speed of the video instead separate buttons*/}
      <div
        style={{
          display: "inline",
        }}
      >
        <button id={"1x"} onClick={() => SetPlayBackSpeed("1x")}>
          1x speed
        </button>
        <button id={"2x"} onClick={() => SetPlayBackSpeed("2x")}>
          2x speed
        </button>
        <button id={".5x"} onClick={() => SetPlayBackSpeed(".5x")}>
          .5x speed
        </button>
        <button id={".25x"} onClick={() => SetPlayBackSpeed(".25x")}>
          .25x speed
        </button>
        <button id={"3x"} onClick={() => SetPlayBackSpeed("4x")}>
          4x speed
        </button>
      </div>
      <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button>
      <VidModal
        isOpen={modalIsOpen}
        onClose={setModalIsOpenToFalse}
        onKeyDown={HandleKeyDown}
        playTime={playTime}
        vidSrc={defaultVidSource}
      />
      {recordState === true && (
        <div>
          <h1>🔴 Time Frame Recording!</h1>
        </div>
      )}
      <p>
        Scrub forward +5 second with "L" key and back -5 seconds with "J" key.
        Play/Pause with "K" key.
      </p>
    </div>
  );
}
export default App;
