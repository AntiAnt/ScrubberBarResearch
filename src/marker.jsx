import { useState } from "react";
import "./App";

export const Marker = ({ start, stop, onClick, segmentIndex, onTimeUpdate }) => {
  function handleTimeUpdate(){
    if(!!onTimeUpdate){
      onTimeUpdate();
    }
  }
  return (
    <div
      onClick={() => {
        !!onClick && onClick(segmentIndex);
      }}
      onTimeUpdate={handleTimeUpdate}
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
