import React, { Component } from "react";
import VideoCover from "react-video-cover";
import "./Host.css";

class Host extends Component {
  render() {
    const { playerList } = this.props;
    return (
      <div className="Host">
        <VideoCover
          className="hero-video"
          videoOptions={{
            src:
              "https://firebasestorage.googleapis.com/v0/b/snapdesign-1c0bb.appspot.com/o/landingvideo.mp4?alt=media&token=8f0bd940-9b77-4e5c-8dc2-658fb419a34a",
            autoPlay: true,
            loop: true,
            muted: true
          }}
        />
      </div>
    );
  }
}
export default Host;
