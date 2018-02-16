import React, { Component } from "react";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import {
  saveNewQuestion,
  changeToAnswerView,
  changeToEndOfGame
} from "../../ducks/quizReducer";
import "./Quiz.css";

import Question from "../SubComponents/Question/Question";
import Host from "../SubComponents/Host/Host";
import Answer from "../SubComponents/Answer/Answer";
import Completed from "../SubComponents/Completed/Completed";
import Header from "../SubComponents/Header/Header";
import Chat from "../SubComponents/Chat/Chat";

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: false
    }
    this.socket = openSocket();
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.startLiveStream = this.startLiveStream.bind(this);
  }

  componentDidMount() {
    this.socket.emit("user connected", this.props.loginReducer.user.first_name);
    this.socket.on("new question", response => {
      if (response.isQuestion === true) {
        this.props.saveNewQuestion(response.question);
      } else if (response.isAnswer === true) {
        this.props.changeToAnswerView();
      } else if (response.isCompleted === true) {
        this.props.changeToEndOfGame();
      }
    });
    this.socket.on("new answer", newinfo => this.props.changeToAnswerView());
  }

  goToNextQuestion() {
    this.socket.emit("next question");
  }

  startLiveStream(){
    setTimeout(() => {
      this.setState({
        live:true 
      })
    }, 6000);
    
  }


  render() {
    const { isQuestion, isAnswer, endOfGame } = this.props.quizReducer;
    const { live } = this.state;
    let whatShows, host;

    if (live) {
      host = <Host>"This is where the Live Streaming is gonna happen"</Host>;
    } else {
      host = <p>Game Starts in 4 seconds!</p>;
    }

    if (isQuestion && !endOfGame) {
      whatShows = (
        <Question
          questionObject={this.props.quizReducer.question}
          socket={this.socket}
        />
      );
    } else if (isAnswer && !endOfGame) {
      whatShows = (
        <Answer
          answerObject={this.props.quizReducer.question}
          socket={this.socket}
        />
      );
    } else if (endOfGame) {
      whatShows = <Completed socket={this.socket} />;
    } else {
      whatShows = null;
    }

    return (
      <div className="Quiz">
        <Header />
        <div className="host-container">
        { host }
        </div>
        <div className="quiz-container" >
          { this.props.loginReducer.user.user_id === 1 && ( <div><button onClick={ this.goToNextQuestion }>Go to Next Question</button></div> )}
          { this.props.loginReducer.user.user_id === 1 && ( <div><button onClick={ this.startLiveStream }>Start LiveStream</button></div> )}
          { whatShows }

        </div>
        <Chat socket={this.socket} />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  saveNewQuestion,
  changeToAnswerView,
  changeToEndOfGame
})(Quiz);
