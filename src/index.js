import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "mobx-react";
import "./assets/index.css";
import { NewWormholeStore } from "./stores/whStore";
import { ShipStore } from "./stores/shipStore";
import { MWD, AB, ZPME } from "./stores/modulesStore";
import { AppStore } from "./stores/appStore";

const mwd1 = new MWD(1, "mwd1", 100000);
const mwd2 = new MWD(2, "mwd2", 100000);
const mwd3 = new MWD(3, "mwd3", 100000);
const mwd4 = new MWD(4, "mwd4", 1000);

const ab1 = new AB(11, "ab1", 5000);
const ab2 = new AB(21, "ab2", 5000);
const ab3 = new AB(31, "ab3", 5000);
const ab4 = new AB(41, "ab4", 5000);

const zpme1 = new ZPME(12, "zpme1", 80);
const zpme2 = new ZPME(22, "zpme2", 80);
const zpme3 = new ZPME(32, "zpme3", 80);
const zpme4 = new ZPME(42, "zpme4", 80);

const whstore = new NewWormholeStore(1, "hi", 2000000);

const shipstore = new ShipStore(
  1,
  "hui",
  [mwd1, mwd2, mwd3, mwd4, ab1, ab2, ab3, ab4, zpme1, zpme2, zpme3, zpme4],
  196800
);

const app = new AppStore(
  [whstore],
  [shipstore],
  [mwd1, mwd2, mwd3, mwd4, ab1, ab2, ab3, ab4, zpme1, zpme2, zpme3, zpme4]
);

console.log(app);

ReactDOM.render(
  <Provider whStore={whstore} shipStore={shipstore} appStore={app}>
    <App />
  </Provider>,
  document.getElementById("root")
);
