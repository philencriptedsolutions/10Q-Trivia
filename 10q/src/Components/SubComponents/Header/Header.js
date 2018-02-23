import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { fire as firebase } from "../../../../src/fire";
import { NavLink } from "react-router-dom";
import HardwareVideogameAsset from "material-ui/svg-icons/hardware/videogame-asset";
import ActionAccountCircle from "material-ui/svg-icons/action/account-circle";
import ActionExitToApp from "material-ui/svg-icons/action/exit-to-app";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import "./Header.css";
import Logo from "./work3.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };

    this.signOut = this.signOut.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          window.location.href = "http://10q-trivia.com";
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
          <MenuItem>
            <NavLink to="/quiz">
              <HardwareVideogameAsset style={{ margin: "20px 0 0 0" }} />
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/profile">
              <ActionAccountCircle />
            </NavLink>
          </MenuItem>
          <MenuItem>
            <ActionExitToApp onClick={this.signOut} />
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
export default Header;
