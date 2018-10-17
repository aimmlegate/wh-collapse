import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { uniqueId, flowRight as compose } from "lodash";
import { inject, observer } from "mobx-react";
import Wormhole from "../store/wormholes";

class AddWhDialog extends Component {
  state = { name: "", mass: null };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleMassChange = event => {
    this.setState({ mass: event.target.value });
  };

  addWh = () => {
    const { name, mass } = this.state;
    const { appStore, close } = this.props;
    if (name.length > 0 && mass > 0) {
      const newWh = new Wormhole(uniqueId("wh_"), name, mass);
      this.setState(() => {
        appStore.addWormhole(newWh);
        close();
        return { name: "", mass: null };
      });
    }
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
        <DialogTitle id="form-dialog-title">Add wormhole</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Wormhole name"
            fullWidth
            value={this.state.name}
            onChange={this.handleNameChange}
          />{" "}
          <TextField
            autoFocus
            margin="dense"
            id="mass"
            label="Wormhole mass (kg)"
            type="number"
            fullWidth
            value={this.state.mass}
            onChange={this.handleMassChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.addWh} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default compose(
  inject("appStore"),
  observer
)(AddWhDialog);
