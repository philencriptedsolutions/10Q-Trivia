// import React, { Component } from "react";
// //Material-ui
// import NavigationClose from "material-ui/svg-icons/navigation/close";
// import Dialog from "material-ui/Dialog";
// import ImageTagFaces from "material-ui/svg-icons/image/tag-faces";
// //Emoji-picker-react
// import EmojiPicker from "emoji-picker-react";
// //Local
// import "../Chat.css";

// class EmojiModal extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       open: false
//     };
//     this.handleModal = this.handleModal.bind(this);
//   }

//   handleModal() {
//     this.setState({
//       open: !this.state.open
//     });
//   }

//   render() {
//     return (
//       <div className="modal-container">
//         <ImageTagFaces onClick={this.handleModal} className="chat-send" />
//         <Dialog
//           bodyClassName="modal-body"
//           actionsContainerClassName="modal-action"
//           contentClassName="modal-content"
//           paperClassName="modal-paper"
//           open={this.state.open}
//           actions={
//             <NavigationClose onClick={this.handleModal} className="chat-send" />
//           }
//         >
//           <EmojiPicker
//             disableDiversityPicker
//             onEmojiClick={this.props.handleEmoji}
//           />
//         </Dialog>
//       </div>
//     );
//   }
// }

// export default EmojiModal;
