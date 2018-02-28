import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { fire as firebase } from "../../../../src/fire";
import ActionAccountCircle from "material-ui/svg-icons/action/account-circle";
import ActionExitToApp from "material-ui/svg-icons/action/exit-to-app";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import Popover from "material-ui/Popover/Popover";

import "./Header.css";
import Logo from "./work3.png";
import DisplayProfile from "../DisplayProfile/DisplayProfile";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      anchorOrigin: {
        horizontal: "right",
        vertical: "bottom"
      },
      targetOrigin: {
        horizontal: "left",
        vertical: "top"
      }
    };

    this.signOut = this.signOut.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setAnchor = this.setAnchor.bind(this);
    this.setTarget = this.setTarget.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  setAnchor(positionElement, position) {
    const { anchorOrigin } = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
      anchorOrigin: anchorOrigin
    });
  }

  setTarget(positionElement, position) {
    const { targetOrigin } = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
      targetOrigin: targetOrigin
    });
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          window.location.href = "http://www.10q-trivia.com";
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  }

  toggleDrawer() {
    const { opened } = this.state;
    this.setState({
      opened: !opened
    });
  }

  render() {
    const img = <img src={Logo} className="logo-img" alt="10Q" />;
    return (
      <div className="header-main">
        <AppBar
          iconElementRight={img}
          className="header-bar"
          iconElementLeft={<NavigationMenu />}
          onLeftIconButtonClick={this.toggleDrawer}
        />

        <Drawer
          anchorOrigin="top"
          open={this.state.opened}
          docked={false}
          width={60}
          onRequestChange={this.toggleDrawer}
        >
          <MenuItem className="sidebar-item">
            <ActionAccountCircle onClick={this.handleClick} />
          </MenuItem>
          <MenuItem>
            <ActionExitToApp onClick={this.signOut} />
          </MenuItem>
        </Drawer>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
          canAutoPosition={false}
          className="popover-header"
        >
          <DisplayProfile />
        </Popover>
      </div>
    );
  }
}
export default Header;
