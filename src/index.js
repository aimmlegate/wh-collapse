import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "mobx-react";
import "./assets/index.css";
import { OldWormholeStore } from "./stores/whStore";

const whstore = new OldWormholeStore();
console.log(whstore);

ReactDOM.render(
  <Provider whStore={whstore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
