import React, { Component } from "react";
import VideoCover from "react-video-cover";
import "./Host.css";

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/newIntroduction.mp4?alt=media&token=69d56f3f-0ba4-45fc-b57e-5a545dce0350",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/lindseyax.mp4?alt=media&token=ca496fea-6386-44e2-ac13-32ce887f067e",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/Trees.mp4?alt=media&token=d647ae5d-0901-4b2c-864e-d04ffd13d006",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/olympicsfinal.mp4?alt=media&token=f29eaabe-6ea2-450d-819f-4cee6ac6d5dd",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/jinyeobkim.mp4?alt=media&token=33dd2bc4-0643-4127-a25c-d3297841340d",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/lobsterrachel.mp4?alt=media&token=d9034299-efc6-4713-b431-4e05752be1dd",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/FlatEarth.mp4?alt=media&token=6ff4f871-bf1d-476f-a467-2b44408844a0",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/beer%20question.mp4?alt=media&token=50189438-9697-410a-89fa-f30cc083f912",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/newalanturing.mp4?alt=media&token=3f159758-0c2a-4f3f-9128-126e2c451cdc",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/jurassic%20park.mp4?alt=media&token=6e907576-b7fe-416c-82c9-b4b2b5312c4c",
        "https://firebasestorage.googleapis.com/v0/b/qtrivia-4dbfa.appspot.com/o/jaylanEnding.mp4?alt=media&token=eb2e32a9-753f-4478-b372-de9ab73de4d7"
      ]
    };
  }
  render() {
    
    return (
      <div className="Host">
        <VideoCover
          className="hero-video"
          videoOptions={{
            src: this.state.videos[this.props.videoNum],
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
