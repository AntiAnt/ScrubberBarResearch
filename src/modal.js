import React, { useState } from "react";
import ReactModal from "react-modal";

export function VidModal({ modalState, funcModalToFalse, HandleKeyDown }) {
  return (
    <div onKeyDown={HandleKeyDown}>
      <ReactModal
        isOpen={modalState}
        style={{
          overlay: {
            backgroundColor: "#282c34",
          },
        }}
      >
        <video controls width="1000">
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
            type="video/mp4"
          ></source>
        </video>
        <button style={{ display: "block" }} onClick={funcModalToFalse}>
          Close Modal
        </button>
      </ReactModal>
    </div>
  );
}
