import { Marker } from "./marker"
import listStartStop from "./context"
import React, {useContext, useEffect, useState} from "react";

export const ScrubberBar = ({currPos, globalWid}) => {
    const {list} = useContext(listStartStop)
    const marginBar = 1

    return (
        <div
            style={{
                position: "relative"
            }}
        >
            <div
                style={{
                    width: `${globalWid}em`,
                    height: "1em",
                    backgroundColor: "blue",
                    top: '0',
                }}
            >
                <div
                    style={{
                        width: "0",
                        height: "2em",
                        border: "solid red",
                        left: `${currPos}em`,
                        top: "-.5em",
                        position: "absolute",
                        zIndex: 1002
                    }}
                >
                </div>
            </div>
            <div
                style={{
                    width: `${globalWid}em`,
                    top: '0',
                    height: "1em",
                    border: "solid",
                    position: "absolute",
                    zIndex: 1001
                }}
            >
                {list.length > 0 && list.map((x, i) =>
                    (
                        <Marker key={i} start={x.startPos} stop={x.stopPos}/>
                    )

                )}
            </div>
        </div>


    )
}