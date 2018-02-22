import React, { Component } from "react";
import VideoCover from "react-video-cover";
import "./Host.css";

class Host extends Component {
  constructor(props){
    super(props)

    this.state = {
      videos : [ 
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/The%20Hunger%20Games%20Katniss%20and%20Peeta%20Reaping%20Scene%20%5BHD%5D%20(2).mp4?alt=media&token=a62be25e-d4da-47b9-880d-629b607080aa", 
        "https://firebasestorage.googleapis.com/v0/b/snapdesign-1c0bb.appspot.com/o/landingvideo.mp4?alt=media&token=8f0bd940-9b77-4e5c-8dc2-658fb419a34a"
        
      ]
    }
  }
  render() {
    console.log(this.props.videoNum)
    return (
      <div className="Host">
        <VideoCover
          className="hero-video"
          videoOptions={{
            src:  this.state.videos[this.props.videoNum],
            autoPlay: true,
            loop: false,
            muted: false
          }}
        />
      </div>
    );
  }
}
export default Host;
