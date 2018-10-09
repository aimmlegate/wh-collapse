import { observable, action, computed, decorate } from "mobx";
import { getProcent } from "../utils";
import whFSM from "./whFSM";

const WH_MASS = 1000000;
const DEVIATION = 10;
const devMargin = getProcent(DEVIATION, WH_MASS);

class WormholeStore extends whFSM {
  startMass = WH_MASS;

  maxMass = WH_MASS + devMargin;

  baseMass = WH_MASS;

  minMass = WH_MASS - devMargin;

  lastJumpMass = 0;

  get state() {
    return this._state;
  }

  getGues(key, prc) {
    switch (key) {
      case "min":
        return getProcent(prc, this.startMass - devMargin);
      case "max":
        return getProcent(prc, this.startMass + devMargin);
      case "base":
        return getProcent(prc, this.startMass);
      default:
        return getProcent(prc, this.startMass);
    }
  }

  shipPass(mass) {
    this.baseMass = this.baseMass - mass;
    this.maxMass = this.maxMass - mass;
    this.minMass = this.minMass - mass;
    this.lastJumpMass = mass;
  }
}

decorate(WormholeStore, {
  baseMass: observable,
  minMass: observable,
  maxMass: observable,
  shipmass: observable,
  lastJumpMass: observable,
  state: computed,
  shipPass: action
});

export class NewWormholeStore extends WormholeStore {
  shipJump(shipmass) {
    if (!this.is("close")) {
      this.shipPass(shipmass);

      if (this.is("fresh") && this.minMass > this.getGues("min", 50)) {
        this.minMass = this.getGues("min", 50);
      }
      if (this.is("destab") && this.minMass > this.getGues("min", 50)) {
        this.minMass = this.getGues("min", 50) + 1;
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

  reduce() {
    try {
      this._reduce();
    } catch (err) {
      console.error(err);
      return;
    }
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
    if (this.maxMass > this.getGues("max", 50)) {
      this.maxMass = this.getGues("max", 50);
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

decorate(NewWormholeStore, {
  shipJump: action,
  disrupte: action,
  collapse: action,
  reduce: action
});
