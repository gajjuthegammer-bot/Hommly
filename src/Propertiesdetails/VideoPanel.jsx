import React from "react";
import icons from "./icons";

function VideoPanel() {
  return (
    <div className="panel">
      <h3>Video</h3>
      <div className="video-box">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
          alt="Property video preview"
        />
        <button className="play-btn" aria-label="Play video">{icons.play}</button>
      </div>
    </div>
  );
}

export default VideoPanel;