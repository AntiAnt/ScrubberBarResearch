import { Marker } from "./marker"

export const ScrubberBar = ({elapsedTime,posList}) => {
    return (
        <div>
            <div
                style={{
                    width: "50em",
                    height: "1em",
                    border: ".1em solid grey",
                    backgroundColor: "lightgrey",
                    borderRadius: ".5em",
                    margin: "1em",
                }}
            >
                {posList.map((pos)=>{
                    return <Marker start={pos.startPos} stop={pos.stopPos} />
                })}
                <div
                    style={{
                        width: ".8em",
                        height: ".8em",
                        border: ".3em solid grey",
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