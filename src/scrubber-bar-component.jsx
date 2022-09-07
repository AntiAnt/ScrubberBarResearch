import { Marker } from "./marker"

export const ScrubberBar = ({elapsedTime}) => {
    
    return (
        <div>
            {/* <input
                type="range"
                value={elapsedTime}
            >
            </input> */}
            <div
                style={{
                    width: "100em",
                    height: "1em",
                    border: ".1em solid grey",
                    backgroundColor: "lightblue",
                    borderRadius: ".5em",
                    margin: "1em",
                }}
            >
                <Marker start={20} stop={40} />
                <Marker start={65} stop={95} />
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