import Avatar from "material-ui/Avatar";
import SocialPeople from "material-ui/svg-icons/social/people";
import { connect } from "react-redux";
import { changeToWrong, handleAnswer } from "../../../ducks/quizReducer";
import React, { Component } from "react";
import "./Question.css";

class Question extends Component {
  render() {
    const {
      question = [],
      wrong,
      playerList,
      handleAnswer,
      userChoice
    } = this.props;
    console.log(question);
    return (
      <div className="question-main">
        <div className="question-card">
        
        
        
          <div className="players-list">
            <SocialPeople className="people-icon"/>
            <i className="player-list">{playerList}</i>
          </div>
          <Avatar
            src="https://pickaface.net/gallery/avatar/totage5611dac58af1e.png"
            size={62.5}
            className="host-avatar"
          />

        
          <p className="question-text">{question[0].question}</p>
          <div className="choices-container">
            <button
              disabled={userChoice || wrong}
              className="question-button"
              style={
                userChoice === question[0].first_answer
                  ? {
                      backgroundColor: "#0e89f3",
                      color: "#ffffff"
                    }
                  : {}
              }
              value={question[0].first_answer}
              onClick={e => handleAnswer(e.target.value)}
            >
              {question[0].first_answer}
            </button>
            <button
              disabled={userChoice || wrong}
              className="question-button"
              style={
                userChoice === question[0].second_answer
                  ? {
                      backgroundColor: "#0e89f3",
                      color: "#ffffff"
                    }
                  : {}
              }
              value={question[0].second_answer}
              onClick={e => handleAnswer(e.target.value)}
            >
              {question[0].second_answer}
            </button>
            <button
              disabled={userChoice || wrong}
              className="question-button"
              style={
                userChoice === question[0].third_answer
                  ? {
                      backgroundColor: "#0e89f3",
                      color: "#ffffff"
                    }
                  : {}
              }
              value={question[0].third_answer}
              onClick={e => handleAnswer(e.target.value)}
            >
              {question[0].third_answer}
            </button>
          </div>
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
