import React, { useState } from "react";
import ReactModal from "react-modal";

export function VidModal({ isOpen, onClose, onKeyDown }) {
  return (
    <div onKeyDown={onKeyDown}>
      <ReactModal
        isOpen={isOpen}
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
        <button style={{ display: "block" }} onClick={onClose}>
          Close Modal
        </button>
      </ReactModal>
    </div>
  );
}
