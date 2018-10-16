import { observable, action, decorate } from "mobx";

export default class GuiState {
  simulationOn = false;

  simDialogStatus = false;

  editShipDialogStatus = false;

  addShipDialog = false;

  openNewSimDialog() {
    this.simDialogStatus = true;
  }

  closeNewSimDialog() {
    this.simDialogStatus = false;
  }

  openEditShipDialog() {
    this.editShipDialogStatus = true;
  }

  closeEditShipDialog() {
    this.editShipDialogStatus = false;
  }

  openAddShipDialog() {
    this.addShipDialog = true;
  }

  closeAddShipDialog() {
    this.addShipDialog = false;
  }
}

decorate(GuiState, {
  simDialogStatus: observable,
  editShipDialogStatus: observable,
  openNewSimDialog: action,
  closeNewSimDialog: action,
  openEditShipDialog: action,
  closeEditShipDialog: action,
  addShipDialog: observable,
  openAddShipDialog: action,
  closeAddShipDialog: action
});
