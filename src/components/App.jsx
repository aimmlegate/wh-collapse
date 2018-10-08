import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "./AppBar";
import WhStatus from "./WhStatus";

const App = () => (
  <>
    <AppBar />
    <div style={{ padding: 20, maxWidth: "1200px", margin: "0 auto" }}>
      <Grid container spacing={16}>
        <Grid item md={12}>
          <WhStatus />
        </Grid>
        <Grid item md={6} />
        <Grid item md={6} />
      </Grid>
    </div>
  </>
);

export default App;
