import React, { useEffect, useState, useRef, createContext } from "react";
import { ScrubberBar } from "./scrubber-bar-component";
import listStartStop  from "./context";



const App = () => {
    const vidElem = useRef(null)
    const [playState, setPlayState] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [stopTime, setStopTime] = useState(null);
    const [listOfStartStop, setListOfStartStop] = useState([]);
    const [currPos, setCurrPos] = useState(0);

    const HandleIncChange = (event) => {
        const ratio = 78.1/event.target.duration;
        setCurrPos(ratio*event.target.currentTime)
    };

    const vidTimeControls = 5;

    const ClearStartStopState = () => {
        setStartTime(null);
        setStopTime(null);
    }

    const HandleKeyUp = (event) => {
        if (event.key.toLowerCase() === "s" && stopTime === null){
            const newWindow = {
                "startTime": startTime,
                "stopTime": vidElem.current.currentTime
            };
            listOfStartStop.push(newWindow);
            setListOfStartStop([...listOfStartStop]);
            ClearStartStopState()
        }
    }

    const HandleKeyDown = (event) => {
        switch (event.key.toLowerCase()){
            case "s":
                if (startTime === null){
                    setStartTime(vidElem.current.currentTime);
                }
                break;
            case "j":
                vidElem.current.currentTime -= vidTimeControls
                break;
            case "k":
                vidElem.current.paused ? vidElem.current.play() : vidElem.current.pause();
                break;
            case "l":
                vidElem.current.currentTime += vidTimeControls
                break;
        }
    }

    const handleTimer = () => {
        setPlayState(!playState);
    }

    return (
        <listStartStop.Provider value = {{ "list": listOfStartStop, "setList": setListOfStartStop}}>
        <div className="center">
            <div>
                <video controls
                       loop={true}
                       onKeyDown={HandleKeyDown}
                       onKeyUp={HandleKeyUp}
                       ref={vidElem}
                       preload="auto"
                       onTimeUpdate={HandleIncChange}
                >
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                            type="video/mp4"/>
                </video>

                    <dl>
                        {listOfStartStop.length > 0 && listOfStartStop.map((x, i) =>
                            (
                                <div key={i}>
                                    <h3><strong>Window {i + 1}</strong></h3>
                                    <dt>Start Time </dt>
                                    <dd>{x.startTime}</dd>
                                    <dt>Stop Time</dt>
                                    <dd>{x.stopTime}</dd>
                                    <br/>
                                </div>
                            )
                        )}
                    </dl>
            </div>
            <ScrubberBar currPos={currPos} />
            <button
                onClick={handleTimer}
            >
                {playState ? "pause" : "play"}
            </button>
        </div>
        </listStartStop.Provider>
    );
}

export default App;
