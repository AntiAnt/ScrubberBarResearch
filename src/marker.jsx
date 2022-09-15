import { useState } from "react"

export const Marker = ({start, stop, barMargin}) => {
    const [width, setWidth] = useState(stop - start);

    return (
        <div
            style={{
                zIndex: 1000,
                backgroundColor: "yellow",
                width: `${width}em`,
                left: `${start}em`,
                height: "1em",
                position: "absolute",
            }}
        >
        </div>
    )
}