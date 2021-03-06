import { observable, action, decorate, computed } from "mobx";

export default class AppStore {
  constructor(wormholes, ships) {
    this.wormholes = wormholes;
    this.ships = ships;
    this.currentWhId = "default";
    this.currentShipId = "default";
  }

  setCurrentWh(id) {
    if (this.wormholes.some(wh => wh.id === id)) {
      this.currentWhId = id;
      const currentWh = this.wormholes.filter(
        wh => wh.id === this.currentWhId
      )[0];
      currentWh.reset();
    } else {
      console.error(new Error("undefined wormhole id"));
    }
  }

  addShip(ship) {
    this.ships.push(ship);
  }

  addWormhole(wh) {
    this.wormholes.push(wh);
  }

  get currentWh() {
    if (this.currentWhId) {
      return this.wormholes.filter(wh => wh.id === this.currentWhId)[0];
    }
    return null;
  }

  setCurrentShip(id) {
    if (this.ships.some(ship => ship.id === id)) {
      this.currentShipId = id;
    } else {
      console.error(new Error("undefined ship id"));
    }
  }

  get currentShip() {
    if (this.currentShipId) {
      return this.ships.filter(ship => ship.id === this.currentShipId)[0];
    }
    return null;
  }

  get simulationStatus() {
    return this.currentShipId && this.currentWhId ? "READY" : "NOT_READY";
  }
}

decorate(AppStore, {
  wormholes: observable,
  ships: observable,
  currentWhId: observable,
  currentShipId: observable,
  simulationOn: observable,
  currentWh: computed,
  currentShip: computed,
  simulationStatus: computed,
  addShip: action,
  addWormhole: action,
  setCurrentWh: action,
  setCurrentShip: action
});
