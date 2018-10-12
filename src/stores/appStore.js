import { observable, action, decorate } from "mobx";

class App {
  constructor(wormholes, ships, modules) {
    this.wormholes = wormholes;
    this.ships = ships;
    this.modules = modules;
  }

  _currentWh = null;
  _currentShip = null;

  set currentWh(id) {
    if (this.wormholes.some(wh => wh.id === id)) {
      const currentWh = this.wormholes.filter(
        wh => wh.id === this._currentWh
      )[0];
      currentWh.reset();
      this._currentWh = id;
    } else {
      console.error(new Error("undefined wormhole id"));
    }
  }

  get currentWh() {
    return this.wormholes.filter(wh => wh.id === this._currentWh)[0];
  }

  set currentShip(id) {
    if (this.ships.some(ship => ship.id === id)) {
      this._currentShip = id;
    } else {
      console.error(new Error("undefined ship id"));
    }
  }

  get currentShip() {
    return this.ships.filter(ship => ship.id === this._currentShip)[0];
  }

  get simulationStatus() {
    return this._currentShip && this._currentWh;
  }
}
