import React , { Component } from 'react';
import { fire as firebase, provider } from '../../../fire';
//import './Login.css';
 
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
      console.log(newUser)
      var token = result.credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
      var google_id = result.user.uid;
      
      if(newUser){ 
        this.props.register(google_id).then(result => {
          firebase.auth().onAuthStateChanged(user => {
            if(user) {
              this.props.history.push('/EditBio'); // A new user is directed to Edit Bio.
            }
          });
        })
      } else if(!newUser) {
          this.props.login(google_id).then(result =>{
          firebase.auth().onAuthStateChanged(user => {
            if(user) {
              this.props.history.push('/Dashboard'); //After successful login, user will be redirected to Dashboard.html
            }
          });
        })
      }

    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email; // The email of the user's account used.
      var credential = error.credential;  // The firebase.auth.AuthCredential type that was used.
    });
  }

  render(){
    return (
      <div className="Login">
        {/* THE LOGO WILL GO HERE*/}
        <button id="loginbutton" onClick={() => this.signInWithGoogle()}> Login or Register </button>
      </div>
    )
  }
}
export default Login;