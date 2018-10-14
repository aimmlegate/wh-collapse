import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Button from "@material-ui/core/Button";
import SimulationDialog from "./SimulationDialog.jsx";

class Simulation extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <Button onClick={this.handleClickOpen}>Open full-screen dialog</Button>
        <SimulationDialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}

export default compose(
  inject("appStore"),
  observer
)(Simulation);
