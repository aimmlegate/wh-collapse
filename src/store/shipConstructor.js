import { observable, action, computed, decorate } from "mobx";
import { MWD, AB, ZPME } from "./modulesConstructor";
import { stackPenalty } from "../utils";

export class Ship {
  constructor(id, name, modules, mass) {
    this.id = id;
    this.name = name;
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
          module !== targetModule
      );
      sameTypeModule.forEach(module => module.forceDeactivate());
    }
    if (targetModule instanceof MWD) {
      const ab = this.modules.filter(module => module instanceof AB);
      const zpme = this.modules.filter(module => module instanceof ZPME);
      if (zpme.some(module => module.active)) {
        zpme.forEach(module => module.forceDeactivate());
      }
      if (ab.some(module => module.active)) {
        ab.forEach(module => module.forceDeactivate());
      }
    }
    if (targetModule instanceof AB) {
      const mwd = this.modules.filter(module => module instanceof MWD);
      if (mwd.some(module => module.active)) {
        mwd.forEach(module => module.forceDeactivate());
      }
    }
    if (targetModule instanceof ZPME) {
      const mwd = this.modules.filter(module => module instanceof MWD);
      if (mwd.some(module => module.active)) {
        mwd.forEach(module => module.forceDeactivate());
      }
    }
  }
}

decorate(Ship, {
  baseMass: observable,
  shipMass: computed,
  triggerModule: action,
  modules: observable
});
