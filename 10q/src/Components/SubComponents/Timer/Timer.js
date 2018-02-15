import React , { Component } from 'react';
//import './Timer.css';
 
class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
        seconds: 10
    }
  }
  removeOneSecond(){
      let seconds = this.state.seconds;
      let newVal = seconds --;
      this.setState({
          seconds: newVal
      })
  }

  render(){
    return (
      <div className="Timer">
        { this.state.seconds }
        { setInterval( this.removeOneSecond , 1000) }
      </div>
    )
  }
}
export default Timer;