import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Button from "@material-ui/core/Button";
import SimulationDialog from "./SimulationDialog.jsx";

const AppHeader = ({ appStore }) => {
  const { simDialogStatus } = appStore;

  const handleClickOpen = () => {
    appStore.openNewSimDialog();
  };

  const handleClose = () => {
    appStore.closeNewSimDialog();
  };

  const handleStart = () => {
    appStore.simulationStart();
    appStore.closeNewSimDialog();
  };

  return (
    <AppBar position="static">
      <SimulationDialog
        fullScreen
        open={simDialogStatus}
        handleClose={handleClose}
        handleStart={handleStart}
      />
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
          Phayder WH-Collapse
        </Typography>
        <Button color="inherit" onClick={handleClickOpen}>
          Start New
        </Button>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = {
  appStore: PropTypes.object.isRequired
};

export default compose(
  inject("appStore"),
  observer
)(AppHeader);
