import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "mobx-react";
import appState from "./store/store.js";

console.log(appState);

ReactDOM.render(
  <Provider appState={appState}>
    <App />
  </Provider>,
  document.getElementById("root")
);
