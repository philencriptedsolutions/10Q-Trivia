import React , { Component } from 'react';
import VideoCover from 'react-video-cover';
import './Host.css';
 
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
            <iframe width="560" height="315" src="https://www.youtube.com/embed/jc7aMhgd0SI?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>
      </div>
    );
  }
}
export default Host;
