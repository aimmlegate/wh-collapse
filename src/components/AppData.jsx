import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const AppData = () => {
  return (
    <List>
      <Divider />
      <ListItem>
        <ListItemText primary="Max WH mass" secondary={0} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Min WH mass" secondary={0} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Ship mass" secondary={0} />
      </ListItem>
    </List>
  );
};

export default AppData;
