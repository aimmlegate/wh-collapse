import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import SelectMenu from "./SelectMenu.jsx";

const AppData = ({ appStore }) => {
  const { wormholes, ships, currentWhId, currentShipId } = appStore;
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
      <Divider />
      <ListItem>
        <ListItemText
          primary="Max WH mass"
          secondary={appStore.currentWh.maxMass}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary="Min WH mass"
          secondary={appStore.currentWh.minMass}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary="Ship mass"
          secondary={appStore.currentShip.shipMass}
        />
      </ListItem>
    </List>
  );
};

AppData.propTypes = {
  appStore: PropTypes.object.isRequired
};

export default compose(
  inject("appStore"),
  observer
)(AppData);
