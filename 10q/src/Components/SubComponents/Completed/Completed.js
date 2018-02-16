import React, { Component } from "react";
import SocialPeople from "material-ui/svg-icons/social/people";
import Header from "../../SubComponents/Header/Header";
import "./Completed.css";

class Completed extends Component {
  render() {
    const { playerList } = this.props;
    return (
      <div className="completed">
        <div className="players-list">
          <SocialPeople />
          {playerList}
        </div>
        <div className="question-card">
          <div className="winner">
            <div className="text">You Win!</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Completed;
