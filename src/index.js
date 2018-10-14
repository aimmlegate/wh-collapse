import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./components/App.jsx";
import appState from "./store/store";

console.log(appState);

ReactDOM.render(
  <Provider appStore={appState}>
    <App />
  </Provider>,
  document.getElementById("root")
);
