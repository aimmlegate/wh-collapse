import { observable, action, computed, decorate } from "mobx";
import { getProcent } from "../utils";
import whFSM from "./whFSM";

const WH_MASS = 2000;
const DEVIATION = 10;
const devMargin = getProcent(DEVIATION, WH_MASS);

class WormholeStore extends whFSM {
  startMass = WH_MASS;

  shipmass = 100;

  maxMass = WH_MASS + devMargin;

  baseMass = WH_MASS;

  minMass = WH_MASS - devMargin;

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
        return 0;
    }
  }

  shipPass(mass) {
    this.baseMass = this.baseMass - mass;
    this.maxMass = this.maxMass - mass;
    this.minMass = this.minMass - mass;
  }

  reduce() {
    try {
      this._reduce();
    } catch (err) {
      console.error(err);
      return;
    }
    this.maxMass = this.getGues("max", 50);
    this.minMass = this.getGues("min", 50) - this.shipmass + 1;
  }

  disrupte() {
    try {
      this._disrupte();
    } catch (err) {
      console.error(err);
      return;
    }
    this.maxMass = this.getGues("max", 50);
    this.minMass = this.getGues("min", 50) - this.shipmass + 1;
    if (this.maxMass > this.getGues("max", 10)) {
      this.maxMass = this.getGues("max", 10) - 1;
    }
  }

  collapse() {
    try {
      this._collapse();
    } catch (err) {
      console.error(err);
      return;
    }
    this.maxMass = 0;
    this.minMass = 0;
    this.baseMass = 0;
  }
}

decorate(WormholeStore, {
  baseMass: observable,
  minMass: observable,
  maxMass: observable,
  shipmass: observable,
  state: computed,
  reduce: action,
  shipPass: action,
  disrupte: action,
  collapse: action
});

export class OldWormholeStore extends WormholeStore {
  shipJump(mass) {
    if (!this.is("close")) {
      this.shipPass(mass);
      if (this.is("destab") && this.minMass < this.getGues("min", 10)) {
        this.minMass = this.getGues("min", 10);
      }
      if (this.is("fresh") && this.maxMass < this.getGues("max", 50)) {
        this.reduce();
      }
      if (this.is("destab") && this.maxMass <= this.getGues("max", 10)) {
        this.disrupte();
      }
      if (this.is("verge") && this.maxMass < 0) {
        this.collapse();
      }
    }
  }
}

decorate(OldWormholeStore, {
  shipJump: action
});
