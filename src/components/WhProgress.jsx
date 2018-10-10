import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const WhProgress = ({
  whStore: { maxMass, minMass, absMax },
  shipStore: { shipMass }
}) => {
  const normalise = value => ((value - 0) * 100) / (absMax - 0);
  const genValues = () => [
    {
      name: "Max",
      mass: normalise(maxMass - shipMass),
      ship: normalise(shipMass)
    },
    {
      name: "Min",
      mass: normalise(minMass - shipMass),
      ship: normalise(shipMass)
    }
  ];
  const data = genValues();
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        data={data}
        layout="vertical"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          scale="linear"
          unit="%"
          domain={[0, 100]}
          allowDataOverflow={true}
        />
        <YAxis dataKey="name" type="category" />
        <Legend />
        <Bar dataKey="mass" stackId="a" stackOffset="sign" fill="#8884d8" />
        <Bar dataKey="ship" stackId="a" stackOffset="none" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default compose(
  inject("whStore", "shipStore"),
  observer
)(WhProgress);
