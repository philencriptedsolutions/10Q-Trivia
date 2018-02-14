import React , { Component } from 'react';
import Header from '../../SubComponents/Header/Header'
import './Completed.css';
 
class Completed extends Component {
  constructor(props){
    super(props)
    this.state = {
 
    }
  }
  render(){
    return (
      
      <div className="completed">
        <div className='question-card'>
          <div className='winner'>
            <div className='text'>
              You Win!
            </div>
          </div>
        
        </div>
      </div>
    )
  }
}
export default Completed;