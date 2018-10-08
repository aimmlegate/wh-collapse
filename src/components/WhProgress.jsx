import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import LinearProgress from "@material-ui/core/LinearProgress";

const normalise = value => ((value - 0) * 100) / (2200 - 0);

const WhProgress = ({ whStore: { baseMass, maxMass, minMass } }) => {
  return (
    <>
      <LinearProgress variant="determinate" value={normalise(maxMass)} />
      <br />
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={normalise(baseMass)}
      />
      <br />
      <LinearProgress variant="determinate" value={normalise(minMass)} />
    </>
  );
};

export default compose(
  inject("whStore"),
  observer
)(WhProgress);
