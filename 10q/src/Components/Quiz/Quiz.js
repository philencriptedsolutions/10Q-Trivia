import React, { Component } from "react";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import {
  saveNewQuestion,
  changeToAnswerView,
  changeToEndOfGame,
  changeToWrong,
  handleAnswer
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
    super(props);

    this.state = {
      playerList: 0,
      level: 0,
      isCompleted: false,
      live: false
    };

    this.socket = openSocket();
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.goToCompleted = this.goToCompleted.bind(this);
    this.startLiveStream = this.startLiveStream.bind(this);
  }

  componentDidMount() {
    this.socket.emit("user connected", this.props.loginReducer.user.first_name);

    this.socket.on("new question", response => {
      if (response.isQuestion === true) {
        this.props.saveNewQuestion(
          response.isQuestion,
          response.isAnswer,
          response.question
        );
      }
    });

    this.socket.on("new answer", response => {
      this.setState({
        level: this.state.level + 1
      });
      console.log(this.state.level);
      if (
        this.props.quizReducer.userChoice !==
        this.props.quizReducer.question[0].correct_answer
      ) {
        this.props.changeToWrong();
      }
      this.props.handleAnswer("");
      this.props.changeToAnswerView(response.isQuestion, response.isAnswer);
    });

    this.socket.on("new user", playerList => {
      this.setState({
        playerList
      });
    });
  }

  goToNextQuestion() {
    this.socket.emit("next question");
  }

  goToCompleted() {
    this.setState({
      isCompleted: true
    });
  }

  startLiveStream() {
    setTimeout(() => {
      this.setState({
        live: true
      });
    }, 6000);
  }

  render() {
    const { isQuestion, isAnswer, question } = this.props.quizReducer;
    const { user } = this.props.loginReducer;
    const { level, playerList, isCompleted, live } = this.state;
    let whatShows, host;

    if (live) {
      host = <Host>"This is where the Live Streaming is gonna happen"</Host>;
    } else {
      host = <p>Game Starts in 4 seconds!</p>;
    }

    if (isCompleted) {
      whatShows = <Completed playerList={playerList} />;
    } else if (isQuestion && !isAnswer) {
      whatShows = (
        <Question questionObject={question} playerList={playerList} />
      );
    } else if (isAnswer && !isQuestion) {
      whatShows = <Answer answerObject={question} playerList={playerList} />;
    } else {
      whatShows = null;
    }

    return (
      <div className="Quiz">
        <Header />

        <div className="host-container">{host}</div>
        <div className="quiz-container">
          <div className="admin-control">
           
            {user.user_id === 1 &&
              level < 10 && (
                <div>
                  <button onClick={this.goToNextQuestion}>
                    Go to Next Question
                  </button>
                </div>
              )}
            {user.user_id === 1 && (
              <div>
                <button onClick={this.startLiveStream}>
                  Start LiveStream
                </button>
                {user.user_id === 8 && level === 10 ? (
                  <button onClick={this.goToCompleted}>Finish</button>
                ) : null}
              </div>
            )}
          </div>
          {whatShows}
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
  changeToWrong,
  changeToEndOfGame,
  handleAnswer
})(Quiz);
