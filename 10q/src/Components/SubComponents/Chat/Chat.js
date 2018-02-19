import React, { Component } from "react";
import ContentSend from "material-ui/svg-icons/content/send";
import TextField from "material-ui/TextField";
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
    this.confirmTyping = this.confirmTyping.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("receive message", messages => {
      this.addMessage(messages);
    });
  }
  componentDidUpdate() {
    const height = this.divElement.scrollHeight;
    this.divElement.scrollTop = height;
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
      img: this.props.user.img,
      user: this.props.user.first_name,
      message: this.state.message
    });
    this.setState({
      message: ""
    });
  }

  confirmTyping(event) {
    if (event.keyCode === 13) {
      this.props.socket.emit("send message", {
        img: this.props.user.img,
        user: this.props.user.first_name,
        message: this.state.message
      });
      this.setState({
        message: ""
      });
    }
  }

  render() {
    this.props.socket.emit("works");
    console.log(this.state.messageList);
    let chatBox = this.state.messageList.map((message, index) => {
      return (
        <div className="chat-line" key={index}>
          <div className="img-container">
            <img className="chat-img" src={message.img} alt="" />
          </div>
          <span>{message.user} :</span>
          <p>{message.message}</p>
        </div>
      );
    });

    return (
      <div className="chat-main">
        <div
          className="chat-box"
          ref={divElement => (this.divElement = divElement)}
        >
          {chatBox}
        </div>
        <div className="chat-input-container">
          <TextField
            onChange={e => this.userTyping(e.target.value)}
            onKeyDown={this.confirmTyping}
            type="text"
            underlineStyle={{ borderColor: "#ffffff" }}
            underlineFocusStyle={{ borderColor: "#f85f6b" }}
            inputStyle={{ color: "#ffffff" }}
            value={this.state.message}
            id="text-field"
          />
          <ContentSend onClick={this.handleChat} className="chat-send" />
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
