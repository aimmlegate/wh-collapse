import { observable, action, computed, decorate } from "mobx";

export class ShipStore {
  baseMass = 196800;
  mdwAdd = 100000;
  mwdStatus = false;

  get shipMass() {
    return this.mwdStatus ? this.baseMass + this.mdwAdd : this.baseMass;
  }

  mwdTrigger() {
    this.mwdStatus = this.mwdStatus ? false : true;
  }
}

decorate(ShipStore, {
  baseMass: observable,
  mdwAdd: observable,
  mwdStatus: observable,
  shipMass: computed,
  mwdTrigger: action
});
