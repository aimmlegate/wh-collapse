import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import AppData from "./AppData.jsx";
import JumpControl from "./JumpControl.jsx";
import WhProgress from "./WhProgress.jsx";
import WhStatus from "./WhStatus.jsx";
import JumpHistory from "./JumpHistory.jsx";

const Simulation = ({ appStore }) => {
  const { simulationStatus } = appStore;

  return (
    <>
      {simulationStatus === "READY" ? (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <WhStatus />
          </Grid>
          <Grid item md={8} xs={12}>
            <JumpControl />
            <JumpHistory />
          </Grid>
          <Grid item md={3} xs={12}>
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
