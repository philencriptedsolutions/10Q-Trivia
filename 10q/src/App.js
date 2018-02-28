import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Login from "../src/Components/Login/Login";
import Quiz from "../src/Components/Quiz/Quiz";
import DisplayProfile from "../src/Components/SubComponents/DisplayProfile/DisplayProfile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/quiz" component={Quiz} />
          <Route path="/profile" component={DisplayProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
