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
    //primary1color: changes NavBar Background & Primary Raised Button Background
    primary1Color: "#0e89f3",
    //accent1color: changes Secondary Raised Button Background
    accent1Color: "#f85f6b",
    //textColor: changes Icon Color & Regular Text & Default Raised Button Text & Menu Text
    textColor: "#ffffff",
    //canvasColor: regular page background color
    canvasColor: "#f85f6b",
    //borderColor: Text Field underline color
    borderColor: "#f85f6b",
    //secondaryTextColor: changes Sub Text Color
    secondaryTextColor: "#f85f6b",
    //alternateTextColor: changes Default Raised Button Background, Primary Raised Button Text, Secondary Raised Button Text
    alternateTextColor: "#0e89f3",
    //shadowColor: changes shadow color
    shadowColor: "#fafafa"
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
