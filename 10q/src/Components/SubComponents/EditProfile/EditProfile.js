import React, { Component } from "react";
import "./EditProfile.css";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import "font-awesome/css/font-awesome.min.css";
import { fire as firebase } from "../../../fire";
import { updateProfile } from "../../../ducks/reducer";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      file: "",
      imagePreviewUrl: "",
      downloadURL: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.processImageUpload = this.processImageUpload.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.submitAllChanges = this.submitAllChanges.bind(this);
  }

  handleFirstNameChange(val) {
    console.log(this.state.firstName);
    this.setState({
      firstName: val
    });
  }
  handleLastNameChange(val) {
    this.setState({
      lastName: val
    });
  }
  processImageUpload(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }

  uploadImage(event) {
    let that = this;
    event.preventDefault();
    let file = this.state.file;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child("userphotos/" + file.name).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      function(error) {},
      function() {
        that.setState({ downloadURL: uploadTask.snapshot.downloadURL });
      }
    );
  }

  submitAllChanges() {
    const { firstName, lastName, downloadURL } = this.state;
    let first_name = firstName;
    let last_name = lastName;
    let img = downloadURL; 
    let uid = this.props.loginReducer.user.user_id;
    console.log( first_name, last_name, img, uid);
    this.props.updateProfile( first_name, last_name, img, uid)
  }

  render() {
    return (
      <div className="EditProfile">
        <TextField
          floatingLabelText="Change your firstName Here"
          onChange={e => this.handleFirstNameChange(e.target.value)}
          className="mui-text-field"
        />
        <br /> <br/>
        <TextField
          floatingLabelText="Change your last name here"
          onChange={e => this.handleLastNameChange(e.target.value)}
          className="mui-text-field"
        />
        <br />
        <br />
        <br />
        <input
          type="file"
          onChange={event => {
            this.processImageUpload(event);
          }}
          alt=""
        /> 
        {this.state.imagePreviewUrl ? (
          <button
            type="submit"
            onClick={event => {
              this.uploadImage(event);
            }}
          > Submit Photo </button>
        ) : null}
        {this.state.downloadURL ? " uploaded!" : null}
        <br />
        <button id=""onClick={ this.submitAllChanges}>Submit Changes</button>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { updateProfile })(EditProfile);
