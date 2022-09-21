import { useState } from "react";
import "./App";

export const Marker = ({ start, stop, onClick, i, onTimeUpdate }) => {
  const [width, setWidth] = useState(stop - start);
  return (
    <div
      onClick={() => {
        onClick(i);
      }}
      onTimeUpdate={onTimeUpdate}
      style={{
        zIndex: 1000,
        backgroundColor: "yellow",
        width: `${width}em`,
        left: `${start}em`,
        height: ".8em",
        position: "absolute",
        border: "solid",
      }}
    ></div>
  );
};
