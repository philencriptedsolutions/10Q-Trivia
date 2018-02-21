import React, { Component } from "react";
import ContentSend from "material-ui/svg-icons/content/send";
import ImageTagFaces from "material-ui/svg-icons/image/tag-faces";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import EmojiPicker from "emoji-picker-react";
import Emojify from "react-emojione";
import { connect } from "react-redux";
import "./Chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      emoji: "",
      messageList: [],
      open: false
    };

    this.userTyping = this.userTyping.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.confirmTyping = this.confirmTyping.bind(this);
    this.handleEmoji = this.handleEmoji.bind(this);
    this.handleModal = this.handleModal.bind(this);
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

  handleEmoji(emojiName, emojiData) {
    this.setState({
      message: this.state.message.concat(`:${emojiData.name}:`)
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

  handleModal() {
    this.setState({
      open: !this.state.open
    });
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
          <div className="chat-content">
            <Emojify style={{ height: 18, width: 18, margin: "3px 0 0 0" }}>
              <span>{message.user} </span>
              <p>{message.message}</p>
            </Emojify>
          </div>
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
          <ImageTagFaces onClick={this.handleModal} className="chat-send" />
          <Dialog
            bodyClassName="modal-body"
            actionsContainerClassName="modal-action"
            contentClassName="modal-content"
            paperClassName="modal-paper"
            open={this.state.open}
            actions={
              <NavigationClose
                onClick={this.handleModal}
                className="chat-send"
              />
            }
          >
            {/* <EmojiPicker onEmojiClick={this.handleEmoji} /> */}
          </Dialog>
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
