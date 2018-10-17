import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Button from "@material-ui/core/Button";
import EditShipsDialog from "./EditShipsDialog.jsx";
import EditWhDialog from "./EditWhDialog.jsx";

const AppHeader = ({ guiStore }) => {
  const { editShipDialogStatus, editWhDialogStatus } = guiStore;

  return (
    <AppBar position="static">
      <EditShipsDialog
        fullScreen
        open={editShipDialogStatus}
        handleClose={() => guiStore.closeEditShipDialog()}
      />
      <EditWhDialog
        fullScreen
        open={editWhDialogStatus}
        handleClose={() => guiStore.closeEditWhDialog()}
      />
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
          Phayder WH-Collapse
        </Typography>
        <Button color="inherit" onClick={() => guiStore.openEditShipDialog()}>
          Ships
        </Button>
        <Button color="inherit" onClick={() => guiStore.openEditWhDialog()}>
          Wormholes
        </Button>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = {
  guiStore: PropTypes.object.isRequired
};

export default compose(
  inject("guiStore"),
  observer
)(AppHeader);
