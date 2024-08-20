import React from "react";
import "./user.css";
const Video = () => {
  return (
    <div className="videoContainer">
      <div className="videoDetail">
        <div className="videoTitle">
          <h2 className="heading">Optimizing Website Functionality & Processes</h2>
        </div>
        <div className="videoDesc">
        Dive into step-by-step instructions for seamless user experiences, covering account management and advanced features.
        </div>
      </div>
      <div className="videoContent">
          <video
            className=" w-100 rounded-5 "
            controls
            style={{
              borderRadius: "8px",
              border: "2px solid #ddd",
              objectFit: "cover",
            }}
          >
            <source
              src="https://stgps.appsndevs.com/digitalplatform/assets/homepageModalVideo-cb3j_YIE.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
    </div>
  );
};

export default Video;
