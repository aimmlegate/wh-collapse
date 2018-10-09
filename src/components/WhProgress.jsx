import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const normalise = value => ((value - 0) * 100) / (1100000 - 0);

const WhProgress = ({
  whStore: { baseMass, maxMass, minMass },
  shipStore: { shipMass }
}) => {
  return (
    <>
      <Typography variant="caption" gutterBottom>
        {`Max deviation Stable Mass: ${maxMass}`}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={normalise(maxMass)}
        style={{ marginBottom: "10px" }}
      />
      <Typography variant="caption" gutterBottom>
        {`Base deviation Stable Mass: ${baseMass}`}
      </Typography>
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={normalise(baseMass)}
        style={{ marginBottom: "10px" }}
      />
      <Typography variant="caption" gutterBottom>
        {`Min deviation Stable Mass: ${minMass}`}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={normalise(minMass)}
        style={{ marginBottom: "10px" }}
      />
      <Typography variant="caption" gutterBottom>
        {`Ship mass: ${shipMass}`}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={normalise(shipMass)}
        style={{ marginBottom: "10px" }}
      />
    </>
  );
};

export default compose(
  inject("whStore", "shipStore"),
  observer
)(WhProgress);
