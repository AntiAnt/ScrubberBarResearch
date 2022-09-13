import { Marker } from "./marker"
import listStartStop from "./context"
import {useContext} from "react";

export const ScrubberBar = ({elapsedTime}) => {
    const {list, setList} = useContext(listStartStop)

    console.log("list:", list)
    return (
        <div>
            {/* <input
                type="range"
                value={elapsedTime}
            >
            </input> */}
            <div
                style={{
                    width: "79em",
                    height: "1em",
                    border: ".1em solid grey",
                    backgroundColor: "blue",
                    borderRadius: ".5em",
                    margin: "1em",
                    // position: "relative",

                }}
            >
                {/*<Marker start={20} stop={40} />*/}
                {/*<Marker start={65} stop={95} />*/}
                <div
                    style={{
                        width: ".8em",
                        height: ".5em",
                        border: ".3em solid red",
                        borderRadius: ".3em",
                        left: `${elapsedTime}em`,
                        position: "relative",
                        zIndex: 1002
                    }}
                >
                </div>
            </div>
        </div>
    )
}