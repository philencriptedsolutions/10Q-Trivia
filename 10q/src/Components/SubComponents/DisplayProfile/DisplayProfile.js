import React, { Component } from 'react';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import EditProfile from '../EditProfile/EditProfile';
import './DisplayProfile.css';
import { connect } from "react-redux";


class DisplayProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    console.log(this.props);

    return (
      <div className ="display-profile">
      <Card  className="profile-card" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.loginReducer.user.first_name}
          subtitle={`Email: ${this.props.loginReducer.user.email === undefined ? 'Yikes! You seem to not be logged in': this.props.loginReducer.user.email }`}
          avatar={this.props.loginReducer.user.img}
          // actAsExpander={false}
          // showExpandableButton={false}
        />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label={ this.state.expanded ? null : `Click To Edit Your Profile` }
          />
        </CardText>
        <CardMedia
          expandable={true}
          
        >
        </CardMedia>
        <CardTitle expandable={true} />
        <CardText expandable={true}>
          <EditProfile className="edit-profile"/>
        </CardText>
      </Card>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(DisplayProfile);
