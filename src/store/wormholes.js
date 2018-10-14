import { observable, action, computed, decorate } from "mobx";
import { getProcent } from "../utils";
import whFSM from "./whFSM";

const DEVIATION = 10;

class WormholeBase extends whFSM {
  constructor(id, name, startMass) {
    super();
    this.id = id;
    this.name = name;
    this.startMass = startMass;
    this.devMargin = getProcent(DEVIATION, startMass);
    this.maxMass = this.startMass + this.devMargin;
    this.minMass = this.startMass - this.devMargin;
  }

  jumpLock = false;

  lastJumpMass = 0;

  get absMax() {
    return this.startMass + this.devMargin;
  }

  get state() {
    return this._state;
  }

  getGues(key, prc) {
    switch (key) {
      case "min":
        return getProcent(prc, this.startMass - this.devMargin);
      case "max":
        return getProcent(prc, this.startMass + this.devMargin);
      default:
        return null;
    }
  }

  shipPass(mass) {
    this.maxMass = this.maxMass - mass;
    this.minMass = this.minMass - mass;
  }

  reset() {
    this._reset();
    this.maxMass = this.startMass + this.devMargin;
    this.minMass = this.startMass - this.devMargin;
  }
}

decorate(WormholeBase, {
  minMass: observable,
  maxMass: observable,
  jumpLock: observable,
  name: observable,
  lastJumpMass: observable,
  absMax: computed,
  state: computed,
  shipPass: action,
  reset: action
});

export default class Wormhole extends WormholeBase {
  shipJump(shipmass) {
    if (!this.is("close")) {
      this.shipPass(shipmass);
      this.jumpLock = true;
      this.lastJumpMass = shipmass;
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
    if (this.maxMass > this.getGues("min", 50)) {
      this.minMass = this.getGues("min", 50) - this.lastJumpMass + 1;
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

decorate(Wormhole, {
  shipJump: action,
  completeJump: action,
  disrupte: action,
  collapse: action,
  reduce: action
});
