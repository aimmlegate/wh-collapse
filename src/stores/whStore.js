import { observable, action, computed, decorate } from "mobx";
import { getProcent } from "../utils";
import whFSM from "./whFSM";

const WH_MASS = 2000000;
const DEVIATION = 10;
const devMargin = getProcent(DEVIATION, WH_MASS);

class WormholeStore extends whFSM {
  startMass = WH_MASS;

  maxMass = WH_MASS + devMargin;

  minMass = WH_MASS - devMargin;

  jumpLock = false;

  get absMax() {
    return this.startMass + devMargin;
  }

  get state() {
    return this._state;
  }

  getGues(key, prc) {
    switch (key) {
      case "min":
        return getProcent(prc, this.startMass - devMargin);
      case "max":
        return getProcent(prc, this.startMass + devMargin);
      default:
        return null;
    }
  }

  shipPass(mass) {
    this.maxMass = this.maxMass - mass;
    this.minMass = this.minMass - mass;
  }
}

decorate(WormholeStore, {
  minMass: observable,
  maxMass: observable,
  jumpLock: observable,
  absMax: computed,
  state: computed,
  shipPass: action
});

export class NewWormholeStore extends WormholeStore {
  shipJump(shipmass) {
    if (!this.is("close")) {
      this.shipPass(shipmass);
      this.jumpLock = true;
    }
  }

  completeJump() {
    this.jumpLock = false;
    if (this.is("fresh") && this.minMass < this.getGues("min", 50)) {
      this.minMass = this.getGues("min", 50);
    }
    if (this.is("destab") && this.minMass < this.getGues("min", 10)) {
      this.minMass = this.getGues("min", 10);
    }
  }

  reduce() {
    try {
      this._reduce();
    } catch (err) {
      console.error(err);
      return;
    }
    this.jumpLock = false;
    if (this.maxMass > this.getGues("max", 50)) {
      this.maxMass = this.getGues("max", 50) - 1;
    }
  }

  disrupte() {
    try {
      this._disrupte();
    } catch (err) {
      console.error(err);
      return;
    }
    this.jumpLock = false;
    if (this.maxMass > this.getGues("min", 10)) {
      this.maxMass = this.getGues("min", 10) - 1;
    }
  }

  collapse() {
    try {
      this._collapse();
    } catch (err) {
      console.error(err);
      return;
    }
    this.jumpLock = true;
    this.maxMass = 0;
    this.minMass = 0;
  }
}

decorate(NewWormholeStore, {
  shipJump: action,
  completeJump: action,
  disrupte: action,
  collapse: action,
  reduce: action
});
