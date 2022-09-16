import { Marker } from "./marker"

export const ScrubberBar = ({elapsedTime,posList,eventspot, onTimeUpdate={onTimeUpdate}}) => {
    return (
        <div>
            <div
                style={{
                    width: "50em",
                    height: "1em",
                    backgroundColor: "lightgrey",
                    borderRadius: ".5em",
                    margin: "1em",
                }}
            >
                {posList.map((pos, i )=>{
                    return <Marker start={pos.startPos} stop={pos.stopPos} onClick={eventspot} i={i} onTimeUpdate={onTimeUpdate}/>
                })}
                <div
                    style={{
                        width: ".2em",
                        backgroundColor: "red",
                        height: "1em",
                        borderRadius: ".4em",
                        left: `${elapsedTime}em`,
                        position: "relative",
                        zIndex: 1001
                    }}
                >
                </div>

            </div>
        </div>
    )
}