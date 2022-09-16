import { useState } from "react"

export const Marker = ({start,stop,onClick, i,onTimeUpdate}) => {
    console.log("start time:    "+start);
    console.log("stop time:    "+stop);
    return (
        <div
        onClick={() => onClick(i)}
        onTimeUpdate={onTimeUpdate}
            style={{
                zIndex: 1000,
                backgroundColor: "yellow",
                width: `${stop - start}em`,
                left: `${start}em`,
                height: ".8em",
                position: "absolute",
                border: "solid",
            }}
        >
        </div>
    )
}