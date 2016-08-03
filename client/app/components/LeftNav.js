import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
  }
  render() {
    return (
      <Drawer
        width={300}
        docked={false}
        open={false}
        onRequestChange={this.handleToggle}
      >
        <img src="img/sidenav-wallpaper.png" style={{ width: '100%' }} />
        {this.props.children}
      </Drawer>
    );
  }
}

const LeftNavItem = props => (
  <MenuItem
    {...props}
  />
);

export { LeftNav, LeftNavItem };

export default LeftNav;
