import React , { Component } from 'react';
//import './Dashboard.css';
 
class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
 
    }
    this.handleGameClick = this.handleGameClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  handleProfileClick(){
    this.props.history.push(`/Profile/${this.props.userid}`);
  }

  handleGameClick(){
    this.props.history.push(`/EditBio/${this.props.userid}`);
  }

  render(){
    return (
      <div className="Dashboard">
        <button onClick={() => this.handleProfileClick}>Profile</button><br/>
        <button onClick={() => this.handleGameClick}>Game</button>
      </div>
    )
  }
}
export default Dashboard;