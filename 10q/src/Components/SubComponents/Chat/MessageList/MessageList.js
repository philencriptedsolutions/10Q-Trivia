import React, { Component } from "react";
//Local
import "../Chat.css";

const MessageList = props => {
  return (
    <div className="chat-line" key={props.index}>
      <div className="img-container">
        <img className="chat-img" src={props.img} alt="" />
      </div>
      <div className="chat-content">
        <span>{props.user} </span>
        <p>{props.message}</p>
      </div>
    </div>
  );
};
export default MessageList;
