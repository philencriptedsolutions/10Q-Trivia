import React , { Component } from 'react';
import { fire as firebase, provider } from '../../../src/fire';
import {  login, register } from '../../ducks/reducer';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css';
import placeHolder from './placeHolder.png'
import '../../App.css';
 
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.signInWithGoogle = this.signInWithGoogle.bind(this);

  }

  signInWithGoogle(){
    
    firebase.auth().signInWithPopup(provider).then((result) => {
      var newUser = result.additionalUserInfo.isNewUser;
      var google_id = result.user.uid;
      
      console.log(result);

      if(newUser){ 
        this.props.register(google_id).then(result => {
          firebase.auth().onAuthStateChanged(user => {
            if(user) {
              this.props.history.push('/Dashboard'); 
            }
          });
        })
      } else if(!newUser) {
          this.props.login(google_id).then(result =>{
          firebase.auth().onAuthStateChanged(user => {
            if(user) {
              this.props.history.push('/Dashboard'); 
            }
          });
        })
      }

    }).catch(console.log);
  }

  render(){
    return (
      <div className="Login">
        {/* THE LOGO WILL GO HERE*/}
        <img src= {placeHolder} className="Logo" alt="Logo" height="42" width="42"/>
        <RaisedButton id="loginbutton" onClick={() => this.signInWithGoogle()} >Login/ Register</RaisedButton >
      </div>
    )
  }
}


const mapStateToProps = state => state;

export default connect(mapStateToProps, {  register, login })(Login);