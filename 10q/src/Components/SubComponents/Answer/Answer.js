import React, { Component } from "react";
import SocialPeople from "material-ui/svg-icons/social/people";
import Avatar from "material-ui/Avatar";
import "./Answer.css";
import { connect } from "react-redux";

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChoice: ""
    };
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(val) {
    this.setState = {
      userChoice: val
    };
  }

  render() {
    const { playerList } = this.props;
    const { userChoice } = this.state;
    return (
      <div className="answer-main">
        <div className="players-list">
          <SocialPeople />
          {playerList}
        </div>
        <div className="answer-card">
          <Avatar
            src="https://pickaface.net/gallery/avatar/totage5611dac58af1e.png"
            size={62.5}
            className="host-avatar"
          />
          <h4 className="answer-text">{this.props.question[0].question}</h4>
          <div className="choices-container">
            {this.props.wrong ? (
              <div>You are incorrect </div>
            ) : (
              <div> You got it correct</div>
            )}

            {/* <button
              className="answer-button"
              onClick={() => this.handleChoice("Tory Burch Purse")}
            > */}
            {/* Backwards hat */}
            {/* label={this.props.question.first_answer} */}
            {/* onClick={()=>this.handleChoice(this.props.question.first_answer)} */}
            {/* </button>
            <button
              className="answer-button"
              onClick={() => this.handleChoice("Tory Burch Purse")}
            >
              Monocle */}
            {/* label={this.props.question.second_answer} */}
            {/* onClick={()=>this.handleChoice(this.props.question.second_answer)} */}
            {/* </button>
            <button
              className="answer-button"
              onClick={() => this.handleChoice("Tory Burch Purse")}
            >
              Tory Burch Purse */}
            {/* label={this.props.question.third_answer} */}
            {/* onClick={()=>this.handleChoice(this.props.question.third_answer)} */}
            {/* </button> */}
          </div>
        </div>
      </div>
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
