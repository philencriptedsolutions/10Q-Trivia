import React, { Component } from "react";
//Material-ui
import Avatar from "material-ui/Avatar";
import SocialPeople from "material-ui/svg-icons/social/people";
import CircularProgress from "material-ui/CircularProgress";
//React-animate-on-scroll
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
//React-redux
import { connect } from "react-redux";
import { changeToWrong, handleAnswer } from "../../../ducks/quizReducer";
//Local
import "./Question.css";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCount: 0,
      intervalId: 100
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    let intervalId = setInterval(this.timer, 1000);
    this.setState({
      intervalId: intervalId
    });
  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount + 11
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const {
      question = {},
      wrong,
      playerList,
      handleAnswer,
      userChoice
    } = this.props;

    let questionLetter = question.question.split(" ").map((letter, index) => {
      return (
        <ScrollAnimation delay={index * 250} animateIn="fadeIn">
          <span key={index}>{letter}&nbsp;</span>
        </ScrollAnimation>
      );
    });

    return (
      <div className="question-main">
        <div className="players-list">
          <SocialPeople className="people-icon" />
          <i className="player-list">{playerList}</i>
        </div>
        <div className="progress-wrapper">
          <Avatar
            src="https://pickaface.net/gallery/avatar/totage5611dac58af1e.png"
            size={60}
            className="host-avatar"
          />
          <CircularProgress
            mode="determinate"
            value={this.state.currentCount}
            size={75}
            style={{
              position: "relative",
              fill: "none",
              transform: "rotate(275deg)"
            }}
            thickness={6}
            color="#0e89f3"
          />
        </div>
        <div className="question-text">{questionLetter}</div>
        <div className="choices-container">
          <ScrollAnimation animateIn="flipInY" delay={500}>
            <button
              disabled={userChoice || wrong}
              className="question-button"
              style={
                userChoice === question.first_answer
                  ? {
                      backgroundColor: "#0e89f3",
                      color: "#ffffff"
                    }
                  : {}
              }
              value={question.first_answer}
              onClick={e => handleAnswer(e.target.value)}
            >
              {question.first_answer}
            </button>
          </ScrollAnimation>
          <ScrollAnimation animateIn="flipInY" delay={750}>
            <button
              disabled={userChoice || wrong}
              className="question-button"
              style={
                userChoice === question.second_answer
                  ? {
                      backgroundColor: "#0e89f3",
                      color: "#ffffff"
                    }
                  : {}
              }
              value={question.second_answer}
              onClick={e => handleAnswer(e.target.value)}
            >
              {question.second_answer}
            </button>
          </ScrollAnimation>
          <ScrollAnimation animateIn="flipInY" delay={900}>
            <button
              disabled={userChoice || wrong}
              className="question-button"
              style={
                userChoice === question.third_answer
                  ? {
                      backgroundColor: "#0e89f3",
                      color: "#ffffff"
                    }
                  : {}
              }
              value={question.third_answer}
              onClick={e => handleAnswer(e.target.value)}
            >
              {question.third_answer}
            </button>
          </ScrollAnimation>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.quizReducer.question,
    wrong: state.quizReducer.wrong,
    userChoice: state.quizReducer.userChoice
  };
};

export default connect(mapStateToProps, { changeToWrong, handleAnswer })(
  Question
);
