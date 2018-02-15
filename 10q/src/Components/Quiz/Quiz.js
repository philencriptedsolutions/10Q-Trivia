import React, { Component } from "react";
import openSocket from "socket.io-client";
import { connect } from 'react-redux';
import { saveNewQuestion, changeToAnswerView, changeToEndOfGame } from '../../ducks/quizReducer';
import './Quiz.css';

import Question from "../SubComponents/Question/Question";
import Host from "../SubComponents/Host/Host";
import Answer from "../SubComponents/Answer/Answer";
import Completed from "../SubComponents/Completed/Completed";
import Header from "../SubComponents/Header/Header";


class Quiz extends Component {
  constructor(props){
    super(props)

    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }
  componentDidMount() {
    this.socket = openSocket();

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

  goToNextQuestion(){
    this.socket.emit( "next question" );
  }


  // also need to do the logic where the question needs to check if the selected answer matches up with the right answer. 
  // maybe do this on the question component where they select an answer and at the time-out it does as comparison, but its added to the redux store. 


  render() {
    console.log("props", this.props);
    const { isQuestion, isAnswer, endOfGame } = this.props.quizReducer;
    let whatShows, host;

    
    if (host) {
      host = <Host>"This is where the Live Streaming is gonna happen"</Host>;
    } else {
      host = <Host>{`The Game Starts in 4 seconds`}</Host>;
    }

    if (isQuestion && !(endOfGame)) {
      whatShows = < Question questionObject={this.props.quizReducer.question} />;
    } else if (isAnswer && !(endOfGame)) {
      whatShows = < Answer answerObject={this.props.quizReducer.question} />;
    } else if (endOfGame) {
      whatShows = < Completed />;
    } else {
      whatShows = null;
    }

    return (
      <div className="Quiz">
        <Header/>
        <div className="quiz-container" >

          { host }
          { this.props.loginReducer.user.user_id === 1 && ( <div><button onClick={(e) => this.goToNextQuestion(e) }>Go to Next Question</button></div> )}
          { this.props.loginReducer.user.user_id === 1 && ( <div><button onClick={(e) => this.goToNextQuestion(e) }>Start LiveStream</button></div> )}
          { whatShows }
          <Answer />
        </div>
       
  
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { saveNewQuestion, changeToAnswerView, changeToEndOfGame })(Quiz);

