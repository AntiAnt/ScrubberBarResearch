import { useState } from "react"

export const Marker = ({start, stop}) => {
    const [width, setWidth] = useState(stop - start);
    debugger
    return (
        <div
            style={{
                zIndex: 1000,
                backgroundColor: "yellow",
                width: `${width}em`,
                left: `${start}em`,
                height: ".8em",
                position: "absolute"
            }}
        >
        </div>
    )
}