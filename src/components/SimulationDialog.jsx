import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import SelectMenu from "./SelectMenu.jsx";

const SimulationDialog = ({ appStore, handleClose, handleStart, ...props }) => {
  const {
    wormholes,
    ships,
    simulationStatus,
    currentWhId,
    currentShipId
  } = appStore;
  const optionsShips = ships.reduce(
    (acc, ship) => ({ ...acc, [ship.id]: ship.name }),
    {}
  );

  const optionsWormholes = wormholes.reduce(
    (acc, wormhole) => ({
      ...acc,
      [wormhole.id]: wormhole.name
    }),
    {}
  );

  return (
    <Dialog {...props}>
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Simulation settings
          </Typography>
          <Button
            color="inherit"
            onClick={handleStart}
            disabled={simulationStatus === "NOT_READY"}
          >
            start
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <SelectMenu
          name="Wormhole"
          options={optionsWormholes}
          selectedId={currentWhId}
          onChange={id => appStore.setCurrentWh(id)}
        />
        <Divider />
        <SelectMenu
          name="Ship"
          options={optionsShips}
          selectedId={currentShipId}
          onChange={id => appStore.setCurrentShip(id)}
        />
      </List>
    </Dialog>
  );
};

export default compose(
  inject("appStore"),
  observer
)(SimulationDialog);
