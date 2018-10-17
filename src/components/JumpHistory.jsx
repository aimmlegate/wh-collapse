import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Remove from "@material-ui/icons/Remove";
import { inject, observer } from "mobx-react";
import { flowRight as compose, uniqueId } from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});

const IconMap = (mass, base) => {
  switch (true) {
    case base > mass: {
      return <ArrowDownward />;
    }
    case base < mass: {
      return <ArrowUpward />;
    }
    default:
      return <Remove />;
  }
};

const JumpHistory = ({
  appStore: {
    currentWh: { jumpsHistory }
  },
  classes
}) => (
  <div className={classes.root}>
    {jumpsHistory.map(historyElement => {
      const { shipname, shipmass, basemass } = historyElement;
      return (
        <Tooltip key={uniqueId("hist_")} title={`Mass: ${shipmass}`}>
          <Chip
            label={shipname}
            icon={IconMap(shipmass, basemass)}
            className={classes.chip}
          />
        </Tooltip>
      );
    })}
  </div>
);

JumpHistory.propTypes = {
  appStore: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  inject("appStore"),
  observer
)(JumpHistory);
