import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "mobx-react";
import "./assets/index.css";
import { NewWormholeStore } from "./stores/whStore";
import { ShipStore } from "./stores/shipStore";

const whstore = new NewWormholeStore();
const shipstore = new ShipStore();

ReactDOM.render(
  <Provider whStore={whstore} shipStore={shipstore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
