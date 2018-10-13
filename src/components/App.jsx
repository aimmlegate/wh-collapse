import React from "react";
import Grid from "@material-ui/core/Grid";
import AppHeader from "./AppHeader";
import WhStatus from "./WhStatus";
import AppData from "./AppData";
import WhProgress from "./WhProgress";
import JumpControl from "./JumpControl";

const App = () => {
  return (
    <>
      <AppHeader />
      <div style={{ padding: 20, maxWidth: "1200px", margin: "0 auto" }}>
        <Grid container spacing={16}>
          <Grid item md={12}>
            <WhStatus />
          </Grid>
          <Grid item md={6}>
            <JumpControl />
          </Grid>
          <Grid item md={6}>
            <AppData />
          </Grid>
          <Grid item md={12}>
            <WhProgress />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default App;
