import Avatar from "material-ui/Avatar";
import SocialPeople from "material-ui/svg-icons/social/people";
import { connect } from "react-redux";
import { changeToWrong } from "../../../ducks/quizReducer";
import React, { Component } from "react";
import "./Question.css";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChoice: ""
    };
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(val) {
    console.log(val);
    this.setState(
      {
        userChoice: val
      },
      () => {
        if (this.state.userChoice !== this.props.question[0].correct_answer)
          this.props.changeToWrong();
      }
    );
  }

  render() {
    const { question = [], wrong, playerList } = this.props;
    const { userChoice } = this.state;
    console.log(question);
    return (
      <div className="question-main">
        <div className="players-list">
          <SocialPeople />
          {playerList}
        </div>
        <div className="question-card">
          <Avatar
            src="https://pickaface.net/gallery/avatar/totage5611dac58af1e.png"
            size={62.5}
            className="host-avatar"
          />
          <h4 className="question-text">{question[0].question}</h4>
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
              onClick={e => this.handleChoice(e.target.value)}
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
              onClick={e => this.handleChoice(e.target.value)}
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
              onClick={e => this.handleChoice(e.target.value)}
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
    wrong: state.quizReducer.wrong
  };
};

export default connect(mapStateToProps, { changeToWrong })(Question);
