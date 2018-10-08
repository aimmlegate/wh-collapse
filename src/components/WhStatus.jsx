import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const WhStatus = () => (
  <Stepper alternativeLabel>
    <Step>
      <StepLabel
        optional={
          <Typography variant="caption" align="center">
            This wormhole has not yet had its stability significantly disrupted
            by ships passing through it
          </Typography>
        }
      >
        Fresh
      </StepLabel>
    </Step>
    <Step>
      <StepLabel
        optional={
          <Typography variant="caption" align="center">
            This wormhole has had its stability reduced by ships passing through
            it, but not to a critical degree yet
          </Typography>
        }
      >
        Destab
      </StepLabel>
    </Step>
    <Step>
      <StepLabel
        optional={
          <Typography variant="caption" align="center">
            This wormhole has had its stability critically disrupted by the mass
            of numerous ships passing through and is on the verge of collapse
          </Typography>
        }
      >
        Verge
      </StepLabel>
    </Step>
    <Step>
      <StepLabel
        optional={
          <Typography variant="caption" align="center">
            As you pass through the wormhole you realize that it collapses
            behind you. Have you become trapped?
          </Typography>
        }
      >
        Closed
      </StepLabel>
    </Step>
  </Stepper>
);

export default WhStatus;