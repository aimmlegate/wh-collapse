import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const JumpControl = ({ whStore, shipStore }) => {
  const { state } = whStore;
  const { shipMass, mwdStatus } = shipStore;
  const critMapName = {
    fresh: "Stability Reduced (50%)",
    destab: "Stability Disrupted (10%)",
    verge: "Closed",
    close: "Reset (work in progress)"
  };
  const critMapFn = {
    fresh: () => whStore.reduce(),
    destab: () => whStore.disrupte(),
    verge: () => whStore.collapse()
  };
  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => whStore.shipJump(shipMass)}
                >
                  Jump
                </Button>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={mwdStatus}
                  onChange={() => shipStore.mwdTrigger()}
                />
              }
              label="MWD "
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={critMapFn[state]}
                >
                  {critMapName[state]}
                </Button>
              }
            />
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default compose(
  inject("whStore", "shipStore"),
  observer
)(JumpControl);
