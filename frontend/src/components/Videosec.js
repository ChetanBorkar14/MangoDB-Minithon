import React from "react";
import video from "../assests/video.mp4";
const Videosec = () => {
  return (
    <div className="video-background">
      <video src={video} autoPlay loop muted playsInline></video>
    </div>
  );
};

export default Videosec;
