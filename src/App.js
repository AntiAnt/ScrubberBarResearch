import React, { useEffect, useState, useRef, createContext } from "react";
import { ScrubberBar } from "./scrubber-bar-component";
import listStartStop  from "./context";



const App = () => {

    const vidElem = useRef(null)
    const [elapsedTime, setElapsedTime] = useState(0);
    const [playState, setPlayState] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [stopTime, setStopTime] = useState(null);
    const [listOfStartStop, setListOfStartStop] = useState([]);
    // const [dur, setDur] = useState(undefined);
    let dur = null;

    // useEffect(() => {
    //     if (vidElem !== null && vidElem.current !== null){
    //         dur = vidElem.current.duration;
    //     }
    // }, [vidElem]);


    // const listOfStartStop = [];
    const vidTimeControls = 5;

    const ClearStartStopState = () => {
        console.log(listOfStartStop)
        setStartTime(null);
        setStopTime(null);
    }

    const HandleGetDur = (event) => {
        if (vidElem !== null && vidElem.current !== null){
            dur = vidElem.current.duration;
        }
    }

    const HandleKeyUp = (event) => {
        if (event.key.toLowerCase() === "s" && stopTime === null){
            const newWindow = {
                "startTime": startTime,
                "stopTime": vidElem.current.currentTime
            };
            listOfStartStop.push(newWindow);
            setListOfStartStop([...listOfStartStop]);
            console.log(vidElem.current.currentTime, 'key up');
            console.log(dur)
            ClearStartStopState()
        }
    }

    const HandleKeyDown = (event) => {
        switch (event.key.toLowerCase()){
            case "s":
                if (startTime === null){
                    setStartTime(vidElem.current.currentTime);
                    console.log(vidElem.current.currentTime , 'key down');
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

    // useEffect(() => {
    //     if (playState && elapsedTime < 100) {
    //         updateTime();
    //     }
    // },[elapsedTime, playState]);

    // const updateTime = async () => {
    //     const delay = await new Promise(resolve => setTimeout(resolve, 1000))
    //     setElapsedTime(elapsedTime + 1);
    // }

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

            <dt>current time</dt>
            <dd>{elapsedTime} sec</dd>
            <ScrubberBar elapsedTime={elapsedTime} />
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
