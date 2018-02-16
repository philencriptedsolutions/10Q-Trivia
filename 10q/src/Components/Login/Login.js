import React, { Component } from "react";
import { fire as firebase, provider } from "../../../src/fire";
import { login, register } from "../../ducks/reducer";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import "./Login.css";
import placeHolder from "./placeHolder.png";
import "../../App.css";
import Logo from "./work3.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }

  signInWithGoogle() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        const {
          given_name,
          family_name,
          email,
          picture
        } = result.additionalUserInfo.profile;
        let google_id = result.user.uid;
        let first_name = given_name;
        let last_name = family_name;
        let img = picture;
        let uid = result.user.uid;
        let isNewUser = result.additionalUserInfo.isNewUser;
        let balance = 0;

        if (isNewUser) {
          this.props
            .register(first_name, last_name, email, img, balance, uid)
            .then(result => {
              firebase.auth().onAuthStateChanged(user => {
                if (user) {
                  this.props.history.push("/Quiz");
                }
              });
            });
        } else if (!isNewUser) {
          this.props.login(uid).then(result => {
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                this.props.history.push("/Quiz");
              }
            });
          });
        }
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="Login">
        <img src={Logo} className="Logo" alt="Logo" />
        <RaisedButton id="loginbutton" onClick={() => this.signInWithGoogle()}>
          Login/ Register
        </RaisedButton>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { register, login })(Login);
