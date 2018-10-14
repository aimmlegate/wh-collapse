import { observable, action, decorate, computed } from "mobx";

export default class AppStore {
  constructor(wormholes, ships) {
    this.wormholes = wormholes;
    this.ships = ships;
  }

  _currentWh = null;

  _currentShip = null;

  simulationOn = false;

  setCurrentWh(id) {
    if (this.wormholes.some(wh => wh.id === id)) {
      this._currentWh = id;
      const currentWh = this.wormholes.filter(
        wh => wh.id === this._currentWh
      )[0];
      currentWh.reset();
    } else {
      console.error(new Error("undefined wormhole id"));
    }
  }

  get currentWh() {
    if (this._currentWh) {
      return this.wormholes.filter(wh => wh.id === this._currentWh)[0];
    }
    return null;
  }

  setCurrentShip(id) {
    if (this.ships.some(ship => ship.id === id)) {
      this._currentShip = id;
    } else {
      console.error(new Error("undefined ship id"));
    }
  }

  get currentShip() {
    if (this._currentShip) {
      return this.ships.filter(ship => ship.id === this._currentShip)[0];
    }
    return null;
  }

  get simulationStatus() {
    return this._currentShip && this._currentWh ? "READY" : "NOT_READY";
  }

  simulationStart() {
    if (this._currentShip && this._currentWh) {
      this.simulationOn = true;
    }
  }

  simulationEnd() {
    this.simulationOn = false;
  }
}

decorate(AppStore, {
  wormholes: observable,
  ships: observable,
  _currentWh: observable,
  _currentShip: observable,
  currentWh: computed,
  currentShip: computed,
  simulationStatus: computed,
  setCurrentWh: action,
  setCurrentShip: action,
  simulationStart: action,
  simulationEnd: action
});
