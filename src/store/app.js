import { observable, action, decorate, computed } from "mobx";

export default class AppStore {
  constructor(wormholes, ships) {
    this.wormholes = wormholes;
    this.ships = ships;
  }

  currentWhId = null;

  currentShipId = null;

  simulationOn = false;

  simDialogStatus = false;

  editDialogStatus = false;

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

  simulationStart() {
    if (this.currentShipId && this.currentWhId) {
      this.simulationOn = true;
    }
  }

  simulationEnd() {
    this.simulationOn = false;
  }

  openNewSimDialog() {
    this.simDialogStatus = true;
  }

  closeNewSimDialog() {
    this.simDialogStatus = false;
  }

  openEditDialog() {
    this.editDialogStatus = true;
  }

  closeEditDialog() {
    this.editDialogStatus = false;
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
  setCurrentWh: action,
  setCurrentShip: action,
  simulationStart: action,
  simulationEnd: action,
  simDialogStatus: observable,
  editDialogStatus: observable,
  openNewSimDialog: action,
  closeNewSimDialog: action,
  openEditDialog: action,
  closeEditDialog: action
});
