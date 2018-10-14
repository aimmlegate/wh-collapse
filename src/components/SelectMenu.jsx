import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

class SimpleListMenu extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: this.props.selectedId
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    const { onChange } = this.props;
    onChange(index);
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls={this.props.name}
          aria-label={this.props.name}
          onClick={this.handleClickListItem}
        >
          <ListItemText
            primary={this.props.name}
            secondary={this.props.options[this.state.selectedIndex]}
          />
        </ListItem>

        <Menu
          id={this.props.name}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {Object.keys(this.props.options).map(optionkey => (
            <MenuItem
              key={optionkey}
              selected={optionkey === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, optionkey)}
            >
              {this.props.options[optionkey]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SimpleListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired
};

export default SimpleListMenu;
