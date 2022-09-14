import { Marker } from "./marker"
import listStartStop from "./context"
import React, {useContext, useState} from "react";

export const ScrubberBar = ({currPos}) => {
    const {list} = useContext(listStartStop)

    // function makeMarker(){
    //     return
    // }

    // if (list.length > 0) {
    //     for (let i = 0; i < list.length; i++) {
    //         markStart = list[i].startTime
    //         markStop = list[i].stopTime
    //     }
    // }

    return (
        <div>
            <div
                style={{
                    width: "78.1em",
                    height: "1em",
                    backgroundColor: "blue",
                    borderRadius: ".5em",
                    margin: "1.01em",
                }}
            >
                {list.length > 0 && list.map((x, i) =>
                    (
                        <Marker key={i} start={i.startTime} stop={i.stopTime}/>
                    )
                )}
                <div
                    style={{
                        width: "0",
                        height: ".8em",
                        border: "solid red",
                        borderRadius: ".3em",
                        left: `${currPos}em`,
                        position: "relative",
                        zIndex: 1002
                    }}
                >
                </div>
            </div>
        </div>
    )
}