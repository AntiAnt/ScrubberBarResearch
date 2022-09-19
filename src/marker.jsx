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
                height: "1em",
                position: "absolute",
            }}
        >
        </div>
    )
}