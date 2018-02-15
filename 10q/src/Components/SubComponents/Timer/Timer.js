import React , { Component } from 'react';
import './Timer.css';
 
class Timer extends Component {
  constructor(props){
    super(props)
    this.state = { 
      currentCount: 10
    }
   this.timer = this.timer.bind(this);
  }

  timer(){
    this.setState({
      currentCount: this.state.currentCount -1
    })
    if(this.state.currentCount < 1){
      clearInterval(this.intervalId);
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  render(){
    return (
      <div className='parent'>
        <div className="timer">
          {this.state.currentCount}
        </div>
      </div>
    )
  }
}
export default Timer;