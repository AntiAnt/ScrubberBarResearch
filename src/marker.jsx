import { useState } from "react"

export const Marker = ({start, stop}) => {
    const [width, setWidth] = useState(stop - start);

    return (
        <div
            style={{
                zIndex: 1000,
                backgroundColor: "yellow",
                width: `${width}em`,
                // width: "1.257em",

                left: `${start}em`,
                // left: "2.753em",

                height: "1em",
                position: "absolute"
            }}
        >
        </div>
    )
}