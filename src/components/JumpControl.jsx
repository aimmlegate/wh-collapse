import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import { FilterTiltShift, Adjust, PlayForWork } from "@material-ui/icons/";

const JumpControl = ({ appStore: { currentShip, currentWh } }) => {
  const { state, jumpLock, minMass, maxMass } = currentWh;
  const { shipMass, modules, name, baseMass } = currentShip;
  const renderedModules = modules.slice();

  const critMapName = {
    fresh: "Stability Reduced (50%)",
    destab: "Stability Disrupted (10%)",
    verge: "Closed",
    close: "Reset (work in progress)"
  };
  const critMapFn = {
    fresh: () => currentWh.reduce(),
    destab: () => currentWh.disrupte(),
    verge: () => currentWh.collapse()
  };
  const closeProbability = Math.abs(
    minMass < shipMass
      ? (100 * (shipMass - minMass)) /
        (shipMass - minMass + (maxMass - shipMass))
      : 0
  );
  const formatProbability = val => (val > 100 ? 100 : Math.round(val, 10));

  const renderProbability = () => {
    if (state === "verge") {
      return (
        <Typography>{`Collapse probability ${formatProbability(
          closeProbability
        )} %`}</Typography>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <FormGroup row style={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Button
                  variant="extendedFab"
                  color="primary"
                  size="large"
                  disabled={jumpLock}
                  onClick={() => currentWh.shipJump(shipMass, baseMass, name)}
                >
                  <PlayForWork />
                  Jump
                </Button>
              }
            />
            {renderedModules.map(module => (
              <FormControlLabel
                key={module.id}
                control={
                  <Switch
                    color="primary"
                    checked={module.active}
                    disabled={jumpLock}
                    onClick={() => currentShip.triggerModule(module.id)}
                  />
                }
                label={module.name}
              />
            ))}
          </FormGroup>
          <FormGroup col style={{ marginBottom: "20px" }}>
            <FormControlLabel
              style={{ marginBottom: "10px" }}
              control={
                <Button
                  variant="fab"
                  mini
                  color="primary"
                  aria-label="Add"
                  disabled={!jumpLock}
                  style={{ marginRight: "10px" }}
                  onClick={() => currentWh.completeJump()}
                >
                  <Adjust />
                </Button>
              }
              label="Wormhole not changed"
            />
            <FormControlLabel
              style={{ marginBottom: "10px" }}
              control={
                <Button
                  variant="fab"
                  mini
                  color="secondary"
                  aria-label="Add"
                  disabled={!jumpLock}
                  style={{ marginRight: "10px" }}
                  onClick={critMapFn[state]}
                >
                  <FilterTiltShift />
                </Button>
              }
              label={critMapName[state]}
            />
          </FormGroup>
          {renderProbability()}
        </Grid>
      </Grid>
    </div>
  );
};

JumpControl.propTypes = {
  appStore: PropTypes.object.isRequired
};

export default compose(
  inject("appStore"),
  observer
)(JumpControl);
