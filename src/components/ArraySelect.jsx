import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { uniqueId } from "lodash";

export default class ArraySelect extends Component {
  state = { values: [] };

  selectHandler = index => event => {
    const { values } = this.state;
    const { onChange } = this.props;
    const sliceValues = values.slice();
    sliceValues[index] = event.target.value;
    this.setState(state => {
      onChange(sliceValues);
      return { ...state, values: sliceValues };
    });
  };

  addNew = () => {
    const { values } = this.state;
    this.setState({ values: [...values, null] });
  };

  removeEl = index => () => {
    const { values } = this.state;
    const { onChange } = this.props;
    const filtredIndexValues = values.filter((v, i) => i !== index);
    this.setState(state => {
      onChange(filtredIndexValues);
      return { ...state, values: filtredIndexValues };
    });
  };

  render() {
    const { title, names } = this.props;
    const { values } = this.state;

    return (
      <div style={{ marginTop: "20px" }}>
        <InputLabel>{title}</InputLabel>
        <FormControl fullWidth>
          {values.map((el, index) => {
            const keyIndex = uniqueId("_iter");
            return (
              <div style={{ display: "flex" }} key={keyIndex}>
                <Select
                  name="name"
                  style={{ flex: 1 }}
                  onChange={this.selectHandler(index)}
                  value={values[index]}
                >
                  {names.map(v => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
                <IconButton size="small" onClick={this.removeEl(index)}>
                  <RemoveIcon />
                </IconButton>
              </div>
            );
          })}

          <FormGroup>
            <FormControlLabel
              control={
                <IconButton size="small" onClick={this.addNew}>
                  <AddIcon />
                </IconButton>
              }
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}
