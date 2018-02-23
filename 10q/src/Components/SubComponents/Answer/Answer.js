import React, { Component } from "react";
//Material-ui
import SocialPeople from "material-ui/svg-icons/social/people";
import Avatar from "material-ui/Avatar";
//React-animate-on-scroll
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
//Local
import "./Answer.css";
import { connect } from "react-redux";

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hidden: true
      });
    }, 8000);
  }

  render() {
    const { playerList, question = {}, answersPicked, wrong } = this.props;
    const { hidden } = this.state;
    return (
      <ScrollAnimation animateIn="fadeIn" delay={500}>
        <div className={hidden ? "hidden" : "answer-main"}>
          <div className="players-list">
            <SocialPeople className="people-icon" />
            <i className="player-list">{playerList}</i>
          </div>
          {wrong ? (
            <ScrollAnimation delay={750} animateIn="wobble">
              <div className="answer-bubble">You are incorrect </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation delay={750} animateIn="bounce">
              <div className="answer-bubble"> You got it correct</div>
            </ScrollAnimation>
          )}

          <ScrollAnimation delay={900} animateIn="fadeIn">
            <h4 className="answer-text">{question.question}</h4>
          </ScrollAnimation>
          <ScrollAnimation animateIn="flipInY" delay={750}>
            <div className="answers-container">
              <button
                disabled={true}
                className={
                  question.correct_answer === question.first_answer
                    ? "correct-button"
                    : "wrong-button"
                }
              >
                <span>{question.first_answer}</span>
                <span>{answersPicked.answerOne}</span>
              </button>
              <button
                disabled={true}
                className={
                  question.correct_answer === question.second_answer
                    ? "correct-button"
                    : "wrong-button"
                }
              >
                <span>{question.second_answer}</span>
                <span>{answersPicked.answerTwo}</span>
              </button>
              <button
                disabled={true}
                className={
                  question.correct_answer === question.third_answer
                    ? "correct-button"
                    : "wrong-button"
                }
              >
                <span> {question.third_answer}</span>
                <span>{answersPicked.answerThree}</span>
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>
    );
  }
}

const mapStateToProps = state => {
  return {
    wrong: state.quizReducer.wrong,
    question: state.quizReducer.question
  };
};
export default connect(mapStateToProps)(Answer);
