import { useState } from "react";
import "./App";

export const Marker = ({ start, stop, onClick, segmentIndex, onTimeUpdate }) => {
  return (
    <div
      onClick={() => {
        onClick(segmentIndex);
      }}
      onTimeUpdate={onTimeUpdate}
      style={{
        backgroundColor: "yellow",
        width: `${stop - start}em`,
        left: `${start}em`,
        height: "1em",
        position: "absolute",
      }}
    ></div>
  );
};
