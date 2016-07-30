import React, { PropTypes } from 'react';
import { Drawer } from 'material-ui';
import LeftNavItem from './LeftNavItem';

import List from 'material-ui/svg-icons/action/list';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.onMenuListTap = this.onMenuListTap.bind(this);

    this.state = {
      open: false,
      menuItems: [
        {
          route: '/files',
          text: 'File List',
          icon: (<List />)
        },
      ]
    };
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  onMenuListTap() {
    this.handleToggle();
  }
  render() {
    const menuLists = this.state.menuItems.map((data, index) => (
      <LeftNavItem
        key={index}
        primaryText={data.text}
        handleClick={this.onMenuListTap}
        leftIcon={data.icon}
        route={data.route}
        isActive={false}
      />
    ));
    return (
      <Drawer
        width={300}
        docked={false}
        open={this.state.open}
        onRequestChange={this.handleToggle}
      >
        <img src="img/sidenav-wallpaper.png" style={{width: "100%"}} />
        {menuLists}
        {this.props.children}
      </Drawer>
    );
  }
}

export default LeftNav;
