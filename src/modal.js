import React, { useEffect,useState } from "react";
import { ScrubberBar } from "./scrubber-bar-component";
import ReactModal from "react-modal";

export function VidModal({ isOpen, onClose, vidSource, setBackTime,onCreate}) {
  const modalVideo = React.createRef(null);
  const [stopTime, setStopTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [recordState, setRecordState] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const vidTimeControls = 5;
  const increment = 50 / videoDuration;

  useEffect(() => {
    if (modalVideo.current) {
      setVideoDuration(modalVideo.current.duration);
    }
  }, [modalVideo]);

  function calcPosition() {
    setElapsedTime(modalVideo.current.currentTime * increment);
  }

  function setOrigin() {
    modalVideo.current.currentTime = setBackTime;
  }

  function handlePlayClick() {
    if (modalVideo.current.paused === true) {
      modalVideo.current.play();
      setPlayState(true);
    } else {
      modalVideo.current.pause();
      setPlayState(false);
    }
  }

  function clearTime() {
    setStartTime(0);
    setStopTime(0);
  }

  function getStartTimeStamp() {
    if (!!modalVideo) {
      setStartTime(modalVideo.current.currentTime);
      setRecordState(true);
    }
  }

  function getStopTimeStamp() {
    if (!!modalVideo) {
      setStopTime(modalVideo.current.currentTime);
      setRecordState(false);
    }
  }

  const HandleKeyUp = (event) => {
    if (event.key.toLowerCase() === "s") {
      getStopTimeStamp();
    }
  };

  const HandleKeyDown = (event) => {
    switch (event.key.toLowerCase()) {
      case "s":
        if(recordState !== true){
        setStartTime(modalVideo.current.currentTime);
        }
        setRecordState(true);
        break;
      case "j":
        modalVideo.current.currentTime -= vidTimeControls;
        break;
    }
  };

  function exportTimeframe(){
    onCreate({"startTime":startTime,"stopTime":stopTime, "description":document.getElementById('descrip').value});
    cleanModal();
    onClose();
  }

  function clearStart(){
    setStartTime(0);
  }

  function clearStop(){
    setStopTime(0);
  }

  function cleanModal(){
    setStartTime(0);
    setStopTime(0);
    document.getElementById('descrip').value ='';
  }

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        style={{
          overlay: {
            backgroundColor: "#282c34",
          },
        }}
      >
        <video
          controls
          width="800"
          onKeyDown={HandleKeyDown}
          onKeyUp={HandleKeyUp}
          ref={modalVideo}
          onLoadedMetadata={setOrigin}
          onTimeUpdate={calcPosition}
        >
          <source
            src={vidSource}
            type="video/mp4"
          ></source>
        </video>
        {recordState === true && (
        <div>
          <p>🔴 Time Frame Recording</p>
        </div>
      )}
        <div id="video-controls">
        <button style={{ display: "block" }} type="button" id="play-pause" onClick={handlePlayClick}>
          {playState ? "pause" : "play"}
        </button>
        <ScrubberBar
          elapsedTime={elapsedTime}
        />
      </div>
        <button id="startTimeButton" onClick={getStartTimeStamp}>
          Set Start Timestamp or Press "S" key
        </button>
        <button id="stopTimeButton" onClick={getStopTimeStamp}>
          Set Stop Timestamp or Release "S" key
        </button>
        <br></br>
        <form>
          <label for="description">Enter a description for the timeframe: </label>
          <input type="text" id="descrip"></input>
        </form>
        <button style={{ display: "block" }} onClick={() => {
          exportTimeframe();
        }}>
          Submit Timeframe and Description
        </button>
        <br></br>
        <button id="clearStartTimeButton" onClick={clearStart}>
          Clear Start Timestamp
        </button>
        <button id="clearStopTimeButton" onClick={clearStop}>
          Clear Stop Timestamp
        </button>
        <button id="clearTimeButton" onClick={clearTime}>
          Clear Timeframe
        </button>
        <button style={{ display: "block" }} onClick={onClose}>
          Close Modal
        </button>
      </ReactModal>
    </div>
  );
}
