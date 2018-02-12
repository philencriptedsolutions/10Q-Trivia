import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Login from './Login';
import Quiz from './Quiz';
import Dashboard from './Dashboard';

class App extends Component {
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
