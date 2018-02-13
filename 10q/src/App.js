import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import Login from '../src/Components/Login/Login';
import Quiz from '../src/Components/Quiz/Quiz';
import Dashboard from '../src/Components/Dashboard/Dashboard';

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      user:{}
    }
    this.handleSaveUser = this.handleSaveUser.bind(this);
  }

  handleSaveUser( userObj ){
    this.setState({ user: userObj });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component = {Login}/>
          <Route path='/Quiz' component = {Quiz}/>
          <Route path='/Dashboard' component = {Dashboard}/>
        </Switch>
      </div>
    );
  }
}


export default App;
