import { observable, action, decorate } from "mobx";
import { getProcent } from "../utils";

class ShipModule {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  canActivate = true;
  active = false;

  trigger() {
    if (this.canActivate) {
      this.active = !this.active;
    }
  }

  lock() {
    this.canActivate = !this.canActivate;
  }

  forceLock() {
    this.canActivate = false;
  }

  forceUnlock() {
    this.canActivate = true;
  }
}

decorate(ShipModule, {
  active: observable,
  canActivate: observable,
  trigger: action,
  lock: action,
  forceLock: action,
  forceUnlock: action
});

export class MWD extends ShipModule {
  constructor(id, name, addMass) {
    super(id, name);
    this.addMass = addMass;
  }

  type = "plaine";

  canStack = false;

  effect = mass => mass + this.addMass;
}

export class AB extends ShipModule {
  constructor(id, name, addMass) {
    super(id, name);
    this.addMass = addMass;
  }

  type = "plaine";

  canStack = false;

  effect = mass => mass + this.addMass;
}

export class ZPME extends ShipModule {
  constructor(id, name, massReduceProcent) {
    super(id, name);
    this.massReduceProcent = massReduceProcent;
  }

  type = "procent";

  canStack = true;

  effect = (mass, penalty) => {
    return (
      parseInt(mass, 10) -
      penalty(getProcent(this.massReduceProcent, parseInt(mass, 10)))
    );
  };
}
