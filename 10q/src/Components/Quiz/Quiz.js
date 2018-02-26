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
      answersPicked: [],
      isCompleted: false,
      live: false,
      videoNum: null
    };

    this.socket = openSocket();
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.goToCompleted = this.goToCompleted.bind(this);
    this.startLiveStream = this.startLiveStream.bind(this);
    this.endLiveStream = this.endLiveStream.bind(this);
    this.resetEverything = this.resetEverything.bind(this);
  }

  componentDidMount() {
    const { user = {} } = this.props.loginReducer;
    if (!user.email) {
      this.props.history.push("/");
    }
    this.socket.emit("user connected", {
      id: this.props.loginReducer.user.user_id,
      first_name: this.props.loginReducer.user.first_name,
      img: this.props.loginReducer.user.img
    });

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
      this.socket.emit("picked choices");
      this.setState({
        level: this.state.level + 1
      });

      if (
        this.props.quizReducer.userChoice !==
        this.props.quizReducer.question.correct_answer
      ) {
        this.props.changeToWrong();
        this.socket.emit("user loser", this.props.loginReducer.user.user_id);
      }
      this.props.handleAnswer("");
      this.props.changeToAnswerView(response.isQuestion, response.isAnswer);
    });

    this.socket.on("new user", playerList => {
      this.setState({
        playerList
      });
    });

    this.socket.on("display complete", isCompleted => {
      this.setState({
        isCompleted
      });
    });

    this.socket.on("display choices", answersPicked => {
      this.setState({
        answersPicked
      });
    });
    this.socket.on("next video", videoNum => {
      this.setState({
        videoNum
      });
    });
  }

  goToNextQuestion() {
    this.socket.emit("next question");
  }

  goToCompleted() {
    this.socket.emit("complete game", true);
  }

  startLiveStream() {
    this.socket.emit("start video");
    this.setState({ live: true });
  }
  endLiveStream() {
    this.setState({ live: false });
  }
  resetEverything() {
    this.socket.emit("reset everything");
    this.setState({
      live: false
    });
  }

  render() {
    const { isQuestion, isAnswer, question = {} } = this.props.quizReducer;
    const { user = {} } = this.props.loginReducer;
    const { level, playerList, isCompleted, live, answersPicked } = this.state;
    let whatShows, host;

    if (live) {
      host = <Host videoNum={this.state.videoNum} />;
    } else {
      host = <p />;
    }

    if (isCompleted) {
      whatShows = <Completed socket={this.socket} playerList={playerList} />;
    } else if (isQuestion && !isAnswer) {
      whatShows = (
        <Question
          socket={this.socket}
          questionObject={question}
          playerList={playerList}
        />
      );
    } else if (isAnswer && !isQuestion) {
      whatShows = (
        <Answer
          answersPicked={answersPicked}
          answerObject={question}
          playerList={playerList}
        />
      );
    } else {
      whatShows = null;
    }
    return (
      <div className="Quiz">
        <Header />
        <div className="host-container">{host}</div>
        <div className="chat-quiz-container">
          {whatShows}
          <div className="admin-control">
            {user.user_id === 1 && level < 10 ? (
              <button onClick={this.goToNextQuestion}>
                Go to Next Question
              </button>
            ) : user.user_id === 1 && level === 10 ? (
              <button onClick={this.goToCompleted}>Finish</button>
            ) : null}
            {user.user_id === 1 && (
              <div>
                <button onClick={this.startLiveStream}>Start Video</button>
                <button onClick={this.endLiveStream}>Stop Video</button>{"  "}
                <button onClick={this.resetEverything}>RESET</button>
              </div>
            )}
          </div>
          <Chat socket={this.socket} />
        </div>
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
