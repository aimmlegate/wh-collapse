import { observable, action, decorate } from "mobx";

export default class WormholeFSM {
  _state = "fresh";

  _reduce() {
    if (this._state === "fresh") {
      this._state = "destab";
    } else {
      throw new Error("Cant transit from this state");
    }
  }

  _disrupte() {
    if (this._state === "destab") {
      this._state = "verge";
    } else {
      throw new Error("Cant transit from this state");
    }
  }

  _collapse() {
    if (this._state === "verge") {
      this._state = "close";
    } else {
      throw new Error("Cant transit from this state");
    }
  }

  is(state) {
    return this._state === state;
  }
}

decorate(WormholeFSM, {
  _state: observable,
  _reduce: action,
  _disrupte: action,
  collapse: action
});
