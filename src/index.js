import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./components/App.jsx";
import { appStore, guiStore } from "./store/store";

ReactDOM.render(
  <Provider appStore={appStore} guiStore={guiStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
