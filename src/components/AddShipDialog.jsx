import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { uniqueId } from "lodash";
import ArraySelect from "./ArraySelect.jsx";
import { MWD, AB, ZPME } from "../store/modules";

const modulesMap = {
  "500MN Mwd": () => new MWD(uniqueId("mod_"), "500MN Mwd", 50000000),
  "50MN Mwd": () => new MWD(uniqueId("mod_"), "50MN Mwd", 5000000),
  "100MN Ab": () => new AB(uniqueId("mod_"), "100MN Ab", 50000000),
  ZPME: () => new ZPME(uniqueId("mod_"), "ZPME", 80)
};

export default class AddShipDialog extends Component {
  state = {};

  handleModulesChange = modules => {
    this.setState({ modules });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleMassChange = event => {
    this.setState({ mass: event.target.value });
  };

  render() {
    const {
      appStore,
      handleClose,
      handleStart,
      classes,
      ...props
    } = this.props;
    return (
      <Dialog {...props}>
        <DialogTitle id="form-dialog-title">Add ship</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ship name"
            fullWidth
            value={this.state.name}
            onChange={this.handleNameChange}
            required
          />{" "}
          <TextField
            autoFocus
            margin="dense"
            id="mass"
            label="Ship mass (kg)"
            type="number"
            fullWidth
            value={this.state.mass}
            onChange={this.handleMassChange}
            required
          />
          <ArraySelect
            title="Modules"
            names={Object.keys(modulesMap)}
            onChange={this.handleModulesChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {}} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
