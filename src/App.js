import React, { useEffect, useState, useRef, createContext } from "react";
import { ScrubberBar } from "./scrubber-bar-component";
import listStartStop  from "./context";

const App = () => {
    const vidElem = useRef(null)
    const [startTime, setStartTime] = useState(null);
    const [stopTime, setStopTime] = useState(null);
    const [listOfStartStop, setListOfStartStop] = useState([]);
    const [currPos, setCurrPos] = useState(0);
    const [recordState, setRecordState] = useState(false)
    const globalWid = 79

    // const MakeLabel = () => {
    //     console.log("Test")
    // }

    const HandleIncChange = (event) => {
        const ratio = globalWid/event.target.duration;
        setCurrPos(ratio*event.target.currentTime)
    };

    const vidTimeControls = 5;

    const ClearStartStopState = () => {
        setStartTime(null);
        setStopTime(null);
    }

    const HandleKeyUp = (event) => {
        if (event.key.toLowerCase() === "s" && stopTime === null){
            setRecordState(false)
            const newWindow = {
                "startTime": startTime,
                "stopTime": event.target.currentTime,
                "startPos": (globalWid/event.target.duration) * startTime,
                "stopPos": (globalWid/event.target.duration) * event.target.currentTime,
            };
            listOfStartStop.push(newWindow);
            setListOfStartStop([...listOfStartStop]);
            ClearStartStopState()
        }
    }

    const HandleKeyDown = (event) => {
        console.log(recordState)
        switch (event.key.toLowerCase()){
            case "s":
                if (startTime === null){
                    setStartTime(vidElem.current.currentTime);
                    setRecordState(true)
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
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                            type="video/mp4"/>
                </video>
            </div>
            <ScrubberBar currPos={currPos} globalWid={globalWid}/>

            { recordState === true &&
                <div>
                    <h1>
                        🔴 Time Frame Recording!
                    </h1>
                </div>
            }
        </div>
        </listStartStop.Provider>
    );
}

export default App;
