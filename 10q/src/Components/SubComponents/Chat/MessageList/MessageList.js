import React, { Component } from "react";
//React-emojione
import Emojify from "react-emojione";
//Local
import "../Chat.css";

const MessageList = props => {
  return (
    <div className="chat-line" key={props.index}>
      <div className="img-container">
        <img className="chat-img" src={props.img} alt="" />
      </div>
      <div className="chat-content">
        <Emojify style={{ height: 18, width: 18, margin: "3px 0 0 0" }}>
          <span>{props.user} </span>
          <p>{props.message}</p>
        </Emojify>
      </div>
    </div>
  );
};
export default MessageList;
