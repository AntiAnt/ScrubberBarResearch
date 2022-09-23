import React, { useEffect,useState } from "react";
import ReactModal from "react-modal";

export function VidModal({ isOpen, onClose, vidSource, setBackTime }) {
  const modalVideo = React.createRef(null);
  const [stopTime, setStopTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [recordState, setRecordState] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [increment, setIncrement] = useState(0);
  const vidTimeControls = 5;
  setIncrement(50 / videoDuration);

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
    console.log("start: "+startTime+"stop: "+stopTime);
  }

  function getStartTimeStamp() {
    if (!!modalVideo) {
      setStartTime(modalVideo.current.currentTime);
      console.log("start time: "+ modalVideo.current.currentTime);
    }
  }

  function getStopTimeStamp() {
    if (!!modalVideo) {
      setStopTime(modalVideo.current.currentTime);
      console.log("start time:"+startTime+"stop time: "+modalVideo.current.currentTime);
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
  function clearTime() {}

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
          width="1000"
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
        <button type="button" id="play-pause" onClick={handlePlayClick}>
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
        <button id="clearTimeButton" onClick={clearTime}>
          Clear Time
        </button>
        <button style={{ display: "block" }} onClick={onClose}>
          Close Modal
        </button>
      </ReactModal>
    </div>
  );
}
