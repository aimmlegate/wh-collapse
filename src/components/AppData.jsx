import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const AppData = ({ appStore }) => (
  <List>
    <ListItem>
      <ListItemText
        primary="WH signature"
        secondary={appStore.currentWh.name}
      />
    </ListItem>
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
      <ListItemText primary="Ship name" secondary={appStore.currentShip.name} />
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

AppData.propTypes = {
  appStore: PropTypes.object.isRequired
};

export default compose(
  inject("appStore"),
  observer
)(AppData);
