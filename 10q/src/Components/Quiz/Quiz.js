import React , { Component } from 'react';
import openSocket from "socket.io-client";
import { connect } from 'react-redux';

//import './Quiz.css';

import Question from '../SubComponents/Question/Question';
import Host from '../SubComponents/Host/Host';
import Answer from '../SubComponents/Answer/Answer';
import Completed from '../SubComponents/Completed/Completed';

class Quiz extends Component {
  constructor(props){
    super(props)
    
  }

  componentDidMount(){
    this.socket = openSocket();
    this.socket.on("new question", question => this.props.saveNewQuestion( question ));
    this.socket.on("new answer", newinfo =>  this.props.changeToAnswerView() );
  }

  submitAnswer(answerSelected){
  
    // Here we can check to see if their selected answer is the same as the right asnwer.
    // It should also only fire off after the time out.  
    const { canContinue } = this.state.props;
    this.socket.emit("answer selected", canContinue);
  }

  render(){
    const { question, answer, completedNum } = this.state.response;
    let whatShows;

    if( question && !(answer) && !( completedNum ) ) {
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
       { this.state.admin ? ( <div><button onClick={ () => this.handleGameStart }></button>Make Game Button Clickable</div> ) : null }
       { whatShows }

      </div>
    )
  }
}
export default Quiz;