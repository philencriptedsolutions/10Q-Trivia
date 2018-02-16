import React, { Component } from "react";
import ContentSend from "material-ui/svg-icons/content/send";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import { connect } from "react-redux";
import "./Chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messageList: []
    };

    this.userTyping = this.userTyping.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("receive message", messages => {
      this.addMessage(messages);
    });
  }

  addMessage(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  userTyping(message) {
    this.setState({
      message
    });
  }

  handleChat(val) {
    val.preventDefault();
    this.props.socket.emit("send message", {
      user: this.props.user.first_name,
      message: this.state.message
    });
    this.setState({
      message: ""
    });
  }

  render() {
    this.props.socket.emit("works");
    console.log(this.state.messageList);
    let chatBox = this.state.messageList.map((message, index) => {
      return (
        <div className="chat-line" key={index}>
          <span>{message.user} :</span> {message.message}
        </div>
      );
    });
    return (
      <div className="chat-main">
        <div className="chat-box">{chatBox}</div>
        <div className="chat-input-container">
          <TextField
            onChange={e => this.userTyping(e.target.value)}
            type="text"
            underlineStyle={{ borderColor: "#ffffff" }}
            underlineFocusStyle={{ borderColor: "#f85f6b" }}
            inputStyle={{ color: "#ffffff" }}
            value={this.state.message}
          />
          {/* <IconButton onClick={this.handleChat} iconClassName="chat-send"> */}
          <ContentSend onClick={this.handleChat} className="chat-send" />
          {/* </IconButton> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.loginReducer.user
  };
};

export default connect(mapStateToProps)(Chat);
