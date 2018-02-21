import React, { Component } from "react";
import Slider from "react-slick";
import SocialPeople from "material-ui/svg-icons/social/people";
import Header from "../../SubComponents/Header/Header";
import "./Completed.css";

class Completed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerList: []
    };
  }
  componentDidMount() {
    this.props.socket.on("winners", winners => {
      this.setState({
        winnerList: winners
      });
    });
  }
  render() {
    let winner = this.state.winnerList.map((user, index) => {
      return (
        <div className="winner-wrapper">
          <img className="winner-img" src={user.img} alt="" />
          <div className="winner-name">{user.user}</div>
        </div>
      );
    });

    let settings = {
      dots: false,
      infinite: true,
      speed: 200,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: false,
      arrows: false
    };

    if (this.state.winnerList.length > 5) {
      settings.slidesToShow = 4;
    } else {
      settings.slidesToShow = this.state.winnerList.length;
    }

    const { playerList } = this.props;
    return (
      <div className="completed">
        <div className="players-list">
          <SocialPeople className="people-icon" />
          <i className="player-list">{playerList}</i>
        </div>
        <div className="completed-card">
          <Slider {...settings}>{winner}</Slider>
        </div>
      </div>
    );
  }
}

export default Completed;
