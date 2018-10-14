import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import AppData from "./AppData.jsx";
import JumpControl from "./JumpControl.jsx";
import WhProgress from "./WhProgress.jsx";
import WhStatus from "./WhStatus.jsx";

const Simulation = ({ appStore }) => {
  const { simulationOn } = appStore;

  return (
    <>
      {simulationOn ? (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <WhStatus />
          </Grid>
          <Grid item md={6} xs={12}>
            <JumpControl />
          </Grid>
          <Grid item md={6} xs={12}>
            <AppData />
          </Grid>
          <Grid item xs={12}>
            <WhProgress />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

Simulation.propTypes = {
  appStore: PropTypes.object.isRequired,
  simulationOn: PropTypes.bool.isRequired
};

export default compose(
  inject("appStore"),
  observer
)(Simulation);
