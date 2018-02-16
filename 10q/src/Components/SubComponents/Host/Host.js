import React, { Component } from "react";
import SocialPeople from "material-ui/svg-icons/social/people";
//import './Host.css';

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerList: 0
    };
  }
  componentDidMount() {
    this.props.socket.on("new user", playerList => {
      this.setState({
        playerList
      });
    });
  }
  render() {
    const { playerList } = this.state;
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
