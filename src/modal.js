import React, { useEffect,useState } from "react";
import ReactModal from "react-modal";

export function VidModal({ isOpen, onClose, vidSource, setBackTime }) {
  const modalVideo = React.createRef(null);
  const [stopPos, setStopPos] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [increment, setIncrement] = useState(0);
  const vidTimeControls = 5;

  useEffect(() => {
    if (modalVideo.current) {
      setVideoDuration(modalVideo.current.duration);
      setIncrement(modalVideo.current.duration / 50);
    }
  }, [modalVideo]);

  function setOrigin() {
    modalVideo.current.currentTime = setBackTime;
  }

  function clearPos() {
    setStartPos(0);
    setStopPos(0);
  }

  function getStartTimeStamp() {
    if (!!modalVideo) {
      console.log("increment"+increment);
      setStartPos(modalVideo.current.currentTime * increment);
      console.log("start: "+ modalVideo.current.currentTime * increment);
    }
  }

  function getStopTimeStamp() {
    if (!!modalVideo) {
      setStopPos(modalVideo.current.currentTime * increment);
      console.log("stop: "+modalVideo.current.currentTime * increment);
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
        setStartPos(modalVideo.current.currentTime * increment);
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
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
            type="video/mp4"
          ></source>
        </video>
        <button id="startTimeButton" onClick={getStartTimeStamp}>
          Set Start Timestamp or Press "S" key
        </button>
        <button id="stopTimeButton" onClick={getStopTimeStamp}>
          Set Stop Timestamp or Release "S" key
        </button>
        <button id="clearTimeButton" onClick={clearPos}>
          Clear Time
        </button>
        <button style={{ display: "block" }} onClick={onClose}>
          Close Modal
        </button>
      </ReactModal>
    </div>
  );
}
