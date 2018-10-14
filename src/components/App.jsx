import "../assets/index.css";
import React from "react";
import Grid from "@material-ui/core/Grid";
import AppHeader from "./AppHeader.jsx";
import Simulation from "./Simulation.jsx";

const App = () => (
  <>
    <AppHeader />
    <div style={{ padding: 20, maxWidth: "1200px", margin: "0 auto" }}>
      <Grid container spacing={16}>
        <Grid item md={12}>
          <Simulation />
        </Grid>
      </Grid>
    </div>
  </>
);

export default App;
