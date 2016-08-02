import React, { PropTypes } from 'react';
import { Drawer, Menu, MenuItem } from 'material-ui';

class LeftNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.onMenuItemTap = this.onMenuItemTap.bind(this);
  }
  onMenuItemTap() {
    const { handleClick } = this.props;
    handleClick();
  }
  render() {
    const { primaryText, leftIcon, route } = this.props;
    const props = { primaryText, leftIcon };
    return (
      <MenuItem
        onTouchTap={this.onMenuItemTap}
        {...props}
      />
    );
  }
}

LeftNavItem.propTypes = {
  primaryText: PropTypes.string.isRequired,
};

export default LeftNavItem;
