import React, { Component } from "react";
import openSocket from "socket.io-client";
//import './Quiz.css';

import Question from "../SubComponents/Question/Question";
import Host from "../SubComponents/Host/Host";
import Answer from "../SubComponents/Answer/Answer";
import Completed from "../SubComponents/Completed/Completed";
import Header from "../SubComponents/Header/Header";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      questionNumber: 0,
      in: true
    };
  }

  componentDidMount() {
    this.socket = openSocket();
    this.socket.on("new question", question =>
      this.props.saveNewQuestion(question)
    );
    this.socket.on("new answer", newinfo => this.props.changeToAnswerView());
  }

  submitAnswer(answerSelected) {
    // Here we can check to see if their selected answer is the same as the right asnwer.
    // It should also only fire off after the time out.
    const { canContinue } = this.state.props;
    this.socket.emit("answer selected", canContinue);
  }

  render() {
    console.log("props", this.props);
    const { isQuestion, isAnswer, endOfGame } = this.props.quizReducer;
    let whatShows, host;

    if (host) {
      host = <Host>"This is where the Live Streaming is gonna happen"</Host>;
    } else {
      host = <Host>{`The Game Starts in 4 seconds`}</Host>;
    }

    if (isQuestion && !endOfGame) {
      whatShows = <Question questionObject={this.state.response} />;
    } else if (isAnswer && !endOfGame) {
      whatShows = <Answer answerObject={this.state.response} />;
    } else if (endOfGame) {
      whatShows = <Completed completedObject={this.state.reponse} />;
    } else {
      whatShows = null;
    }

    return (
      <div className="Quiz">
        <Header />
        {host}
        {this.props.loginReducer.user.uid === 1 ? (
          <div>
            <button onClick={() => this.handleGameStart} />Make Game Button
            Clickable
          </div>
        ) : null}
        {whatShows}
      </div>
    );
  }
}
export default Quiz;
