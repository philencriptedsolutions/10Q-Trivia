import React , { Component } from 'react';
//import './Completed.css';
 
class Completed extends Component {
  constructor(props){
    super(props)
    this.state = {
 
    }
  }
  render(){
    return (
      <div className="Completed">
        <span>This means the last question was submitted and you've reached the end of the question.</span>
      </div>
    )
  }
}
export default Completed;