import { observable, action, decorate } from "mobx";

export default class GuiState {
  simulationOn = false;

  simDialogStatus = false;

  editShipDialogStatus = false;

  addShipDialog = false;

  editWhDialogStatus = false;

  addWhDialog = false;

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

  openEditWhDialog() {
    this.editWhDialogStatus = true;
  }

  closeEditWhDialog() {
    this.editWhDialogStatus = false;
  }

  openAddWhDialog() {
    this.addWhDialog = true;
  }

  closeAddWhDialog() {
    this.addWhDialog = false;
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
  closeAddShipDialog: action,
  editWhDialogStatus: observable,
  addWhDialog: observable,
  openAddWhDialog: action,
  closeAddWhDialog: action,
  openEditWhDialog: action,
  closeEditWhDialog: action
});
