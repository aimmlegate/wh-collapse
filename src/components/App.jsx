import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import AppBar from "./AppBar";
import WhStatus from "./WhStatus";
import AppData from "./AppData";
import WhProgress from "./WhProgress";

const App = ({ whStore }) => {
  const { getFsm } = whStore;
  return (
    <>
      <AppBar />
      <div style={{ padding: 20, maxWidth: "1200px", margin: "0 auto" }}>
        <Grid container spacing={16}>
          <Grid item md={12}>
            <WhStatus whStatus={getFsm.state} />
            <WhProgress />
          </Grid>
          <Grid item md={6}>
            <Button onClick={() => whStore.shipJump(100)}>Jump</Button>
          </Grid>
          <Grid item md={6}>
            <AppData />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default compose(
  inject("whStore"),
  observer
)(App);
