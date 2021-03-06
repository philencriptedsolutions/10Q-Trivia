import React, { Component } from "react";
import Slider from "react-slick";
import SocialPeople from "material-ui/svg-icons/social/people";
import "./Completed.css";

class Completed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerList: []
    };
  }
  componentDidMount() {
    this.props.socket.on("winners", winnerList => {
      this.setState({
        winnerList
      });
    });
  }
  render() {
    let winner = this.state.winnerList.map((user, index) => {
      return (
        <Slider {...settings}>
          <div className="winner-wrapper">
            <img className="winner-img" src={user.img} alt="" />
            <div className="winner-name">{user.user}</div>
          </div>
        </Slider>
      );
    });

    let settings = {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
      pauseOnHover: false,
      arrows: false
    };

    const { playerList } = this.props;
    return (
      <div className="completed">
        <div className="players-list">
          <SocialPeople className="people-icon" />
          <i className="player-list">{playerList}</i>
        </div>
        <div className="completed-text">WINNERS:</div>
        <div className="completed-card">{winner}</div>
      </div>
    );
  }
}

export default Completed;
