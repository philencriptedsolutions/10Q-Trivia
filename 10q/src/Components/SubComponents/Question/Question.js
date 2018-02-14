import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
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
    this.setState = {
      userChoice: val
    };
  }
  render() {
    return (
      <div className="question-main">
        <div className="question-card">
          <Avatar
            src="https://pickaface.net/gallery/avatar/totage5611dac58af1e.png"
            size={80}
            className="host-avatar"
          />
          <h4 className="question-text">
            {/* {this.props.question.question} */}
            What is Stevens favorite accessory?
          </h4>
          <div className="choices-container">
            <RaisedButton
              label="Backwards hat"
              // label={this.props.question.first_answer}
              className="question-button"
              onClick={() => this.handleChoice("Backwards hat")}
              // onClick={()=>this.handleChoice(this.props.question.first_answer)}
            />
            <RaisedButton
              label="Monocle"
              // label={this.props.question.second_answer}
              className="question-button"
              onClick={() => this.handleChoice("Monocle")}
              // onClick={()=>this.handleChoice(this.props.question.second_answer)}
            />
            <RaisedButton
              label="Tory Burch Purse"
              // label={this.props.question.third_answer}
              className="question-button"
              onClick={() => this.handleChoice("Tory Burch Purse")}
              // onClick={()=>this.handleChoice(this.props.question.third_answer)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Question;
