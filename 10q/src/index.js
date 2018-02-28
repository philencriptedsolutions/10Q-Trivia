import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
//Material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
//Redux store
import store from "./ducks/store";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "transparent",
    accent1Color: "#f85f6b",
    textColor: "#ffffff",
    canvasColor: "#f85f6b",
    borderColor: "#f85f6b",
    secondaryTextColor: "#f85f6b",
    alternateTextColor: "#0e89f3",
    shadowColor: "transparent"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
