import React , { Component } from 'react';
//import './Host.css';
 
class Host extends Component {
  
  render(){
    return (
      <div className="Host">
        {this.props.children}
      </div>
    )
  }
}
export default Host;