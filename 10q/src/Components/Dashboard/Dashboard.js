import React , { Component } from 'react';
//import './Dashboard.css';
import { connect } from 'react-redux';

 
class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameIsStarting:false
    }
    this.handleGameClick = this.handleGameClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  handleProfileClick(){
    this.props.history.push(`/Profile/${this.props.userid}`);
  }

  handleGameClick(){
    this.props.history.push(`/Game/${this.props.userid}`);
  }
  
  handleGameStart(){
    this.setState({ gameIsStarting : true })
  }

  render(){
    return (
      <div className="Dashboard">
        <button onClick={() => this.handleProfileClick}>Profile</button><br/>
        { this.state.gameIsStarting ? ( <div><button onClick={ () => this.handleGameClick }>Go To Game</button></div> ) : null }<br/>
        { this.state.admin ? ( <div><button onClick={ () => this.handleGameStart }></button>Make Game Button Clickable</div> ) : null }
      </div>
    )
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {  })(Dashboard);