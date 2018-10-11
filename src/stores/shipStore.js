import { observable, action, computed, decorate } from "mobx";
import { MWD, AB, ZPME } from "./modulesStore";
import { stackPenalty } from "../utils";

export class ShipStore {
  constructor(modules, mass) {
    this.baseMass = mass;
    this.modules = modules;
  }

  get shipMass() {
    const activeModules = this.modules.filter(module => module.active);
    const plaineModules = activeModules.filter(
      module => module.type === "plaine"
    );
    const procentModules = activeModules.filter(
      module => module.type === "procent"
    );
    const plainTransformed = plaineModules.reduce(
      (resultMass, module) => module.effect(resultMass),
      this.baseMass
    );
    const procentTransformed = procentModules.reduce(
      (resultMass, module, index) => {
        return module.effect(resultMass, stackPenalty(index));
      },
      plainTransformed
    );
    return procentTransformed;
  }

  triggerModule(id) {
    const targetModule = this.modules.filter(module => module.id === id)[0];
    targetModule.trigger();
    if (!targetModule.canStack) {
      const sameTypeModule = this.modules.filter(
        module =>
          module.constructor === targetModule.constructor &&
          module != targetModule
      );
      sameTypeModule.forEach(module => module.lock());
    }
    if (targetModule instanceof MWD) {
      const ab = this.modules.filter(module => module instanceof AB);
      const zpme = this.modules.filter(module => module instanceof ZPME);
      ab.forEach(module => module.lock());
      zpme.forEach(module => module.lock());
    }
    if (targetModule instanceof AB) {
      const mwd = this.modules.filter(module => module instanceof MWD);
      mwd.forEach(module => module.lock());
    }
    if (targetModule instanceof ZPME) {
      const mwd = this.modules.filter(module => module instanceof MWD);
      const zpme = this.modules.filter(module => module instanceof ZPME);
      if (zpme.some(module => module.active)) {
        mwd.forEach(module => module.forceLock());
      } else {
        mwd.forEach(module => module.forceUnlock());
      }
    }
  }
}

decorate(ShipStore, {
  baseMass: observable,
  shipMass: computed,
  triggerModule: action,
  modules: observable
});
