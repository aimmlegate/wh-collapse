import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./assets/index.css";
import { OldWormholeStore } from "./stores/whStore";

const whstore = new OldWormholeStore();

ReactDOM.render(<App whStore={whstore} />, document.getElementById("root"));
