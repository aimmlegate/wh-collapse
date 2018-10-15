import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Button from "@material-ui/core/Button";
import SimulationDialog from "./SimulationDialog.jsx";
import EditShipsDialog from "./EditShipsDialog.jsx";

const AppHeader = ({ appStore }) => {
  const { simDialogStatus, editDialogStatus } = appStore;

  const handleClickNewOpen = () => {
    appStore.openNewSimDialog();
  };

  const handleNewClose = () => {
    appStore.closeNewSimDialog();
  };

  const handleClickEditOpen = () => {
    appStore.openEditDialog();
  };

  const handleEditClose = () => {
    appStore.closeEditDialog();
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
        handleClose={handleNewClose}
        handleStart={handleStart}
      />
      <EditShipsDialog
        fullScreen
        open={editDialogStatus}
        handleClose={handleEditClose}
      />
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
          Phayder WH-Collapse
        </Typography>
        <Button color="inherit" onClick={handleClickEditOpen}>
          Ships
        </Button>
        <Button color="inherit" onClick={handleClickNewOpen}>
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
