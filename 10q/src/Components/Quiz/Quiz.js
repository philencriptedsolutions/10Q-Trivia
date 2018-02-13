import React , { Component } from 'react';
import openSocket from "socket.io-client";
//import './Quiz.css';

import Question from '../SubComponents/Question/Question';
import Host from '../SubComponents/Host/Host';
import Answer from '../SubComponents/Answer/Answer';
import Completed from '../SubComponents/Completed/Completed';

class Quiz extends Component {
  constructor(props){
    super(props)
    this.state = {
      response:{},
      questionNumber:0
      in:true;
    }
  }

  componentDidMount(){
    this.socket = openSocket();
    this.socket.on("new question", question => this.setState({ response : question }));
    this.socket.on("update question number", questionNumber => {
      this.setState({ questionNumber });
    });

  }

  submitAnswer(answerSelected){
    this.socket.emit("answer selected", in => this.setState({ in }));
  }

  render(){
    const { question, answer, completedNum } = this.state.response;
    let whatShows;

    if( question && !(answer) && !( completedNum ) {
      whatShows = < Question questionObject={ this.state.response }/>;
    } else if( !( question ) && answer && !( completedNum ) ) {
      whatShows = < Answer answerObject={ this.state.response }/>;
    } else if( completedNum ) {
      whatShows = < Completed completedObject={ this.state.reponse }/>;
    } else {
      whatShows = null;
    }

    return (
      <div className="Quiz">
       { whatShows }
      </div>
    )
  }
}
export default Quiz;