import React, { Component } from "react";
import SocialPeople from "material-ui/svg-icons/social/people";
//import './Host.css';

class Host extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { playerList } = this.props;
    return (
      <div className="Host">
        <div className="players-list">
          <SocialPeople />
          {playerList}
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default Host;
