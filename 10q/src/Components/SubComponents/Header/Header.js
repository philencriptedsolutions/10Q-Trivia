import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { fire as firebase } from '../../../../src/fire';
import { NavLink } from 'react-router-dom'
import HardwareVideogameAsset from "material-ui/svg-icons/hardware/videogame-asset";
import ActionAccountCircle from "material-ui/svg-icons/action/account-circle";
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opened: false,

        }

        this.signOut = this.signOut.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);

    }

    signOut() {
        firebase.auth().signOut().then(() => {
            window.location.href = "http://localhost:3000/"
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    toggleDrawer() {
        const { opened } = this.state;
        this.setState({
            opened: !opened
        });
    }


    render() {
        return (
            <div>
                <AppBar
                    //iconElementRight={`Logo`}
                    iconElementLeft={
                        <NavigationMenu />
                    }
                    onLeftIconButtonClick={() => this.toggleDrawer()}
                />

                <Drawer
                    open={this.state.opened}
                    docked={false}
                    onRequestChange={() => this.toggleDrawer()}
                >
                    <MenuItem leftIcon={<HardwareVideogameAsset />}>
                        <NavLink to="/Quiz">
                            <p > Game </p>
                        </NavLink>
                    </MenuItem>
                    <MenuItem leftIcon={<ActionAccountCircle />}>
                        <NavLink to="/profile">
                            <p > Profile </p>
                        </NavLink>
                    </MenuItem>
                    <MenuItem leftIcon={<ActionExitToApp />}>
                        <p onClick={this.signOut} > Logout </p>
                    </MenuItem>
                </Drawer>
            </div>

        )
    }
}
export default Header