import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const AppData = ({
  whStore: { baseMass, maxMass, minMass, shipmass, state }
}) => {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Base WH mass" secondary={baseMass} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Max WH mass" secondary={maxMass} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Min WH mass" secondary={minMass} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Ship mass" secondary={shipmass} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="State" secondary={state} />
      </ListItem>
    </List>
  );
};

export default compose(
  inject("whStore"),
  observer
)(AppData);
