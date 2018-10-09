import { observable, action, computed, decorate, extendObservable } from "mobx";
import { factory as StateMachineFactory } from "javascript-state-machine";
import { getProcent } from "../utils";

const WH_MASS = 2000;
const DEVIATION = 10;
const devMargin = getProcent(DEVIATION, WH_MASS);

class WormholeStore {
  constructor() {
    this._fsm();
  }

  startMass = WH_MASS;

  shipmass = 100;

  maxMass = WH_MASS + devMargin;

  baseMass = WH_MASS;

  minMass = WH_MASS - devMargin;

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
    this.reduce();
    //this.maxMass = this.getGues("max", 50);
    //this.minMass = this.getGues("min", 50) - shipmass + 1;
  }

  disrupte() {
    this.disrupte();
    //if (this.maxMass > this.getGues("max", 10)) {
    //  this.maxMass = this.getGues("max", 10) - 1;
    //}
  }

  collapse() {
    this.collapse();
    //this.maxMass = 0;
    //this.minMass = 0;
    //this.baseMass = 0;
  }
}

decorate(WormholeStore, {
  baseMass: observable,
  minMass: observable,
  maxMass: observable,
  shipmass: observable,
  reduce: action,
  shipPass: action,
  disrupte: action,
  collapse: action,
  _fsm: observable
});

StateMachineFactory(WormholeStore, {
  init: "fresh",
  transitions: [
    { name: "reduce", from: "fresh", to: "destab" },
    { name: "disrupte", from: "destab", to: "verge" },
    { name: "collapse", from: "verge", to: "close" }
  ]
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
