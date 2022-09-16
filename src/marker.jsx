import { useState } from "react"
import './App'

export const Marker = ({start,stop,onClick, i,onTimeUpdate}) => {
    return (
        <div
        onClick={() => {
            onClick(i);
          }}
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