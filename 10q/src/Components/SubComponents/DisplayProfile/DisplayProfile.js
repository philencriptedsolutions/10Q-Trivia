import React, { Component } from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import Toggle from "material-ui/Toggle";
import EditProfile from "../EditProfile/EditProfile";
import "./DisplayProfile.css";
import { connect } from "react-redux";

class DisplayProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded });
  }

  handleToggle(event, toggle) {
    this.setState({ expanded: toggle });
  }

  handleExpand() {
    this.setState({ expanded: true });
  }

  handleReduce() {
    this.setState({ expanded: false });
  }

  render() {
    return (
      <div className="display-profile">
        <Card
          className="profile-card"
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
        >
          <CardHeader
            title={this.props.loginReducer.user.first_name}
            titleStyle={{ margin: "0 0 6px 0" }}
            subtitle={
              this.props.loginReducer.user.email === undefined
                ? "Yikes! You seem to not be logged in"
                : this.props.loginReducer.user.email
            }
            avatar={this.props.loginReducer.user.img}
          />
          <CardText>
            <Toggle
              toggled={this.state.expanded}
              onToggle={this.handleToggle}
              labelPosition="right"
              label={this.state.expanded ? null : `Click To Edit Your Profile`}
            />
          </CardText>
          <CardText className="edit-container" expandable={true}>
            <EditProfile />
          </CardText>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(DisplayProfile);
