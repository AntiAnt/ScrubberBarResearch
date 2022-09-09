import {useState} from "react";

export const AnnotationComponent = () => {
    const [input, setInput] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
        console.log(event)
    }

    return(
        <div>
            <input
                type="text"
                value={input}
                style={{
                    display: "block",
                    width: "1273.4px",
                    border: "solid"
                }}
                onChange={handleInputChange}
            />
        </div>
    )
}