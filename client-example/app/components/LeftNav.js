import React, { PropTypes } from 'react';
import { Drawer } from 'material-ui';
import LeftNavItem from './LeftNavItem';

import UserPage from 'material-ui/svg-icons/action/account-box';
import NewsFeeds from 'material-ui/svg-icons/action/picture-in-picture';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      open: false,
    };
    this.menuItems = [
      {
        text: 'News Feed',
        icon: (<NewsFeeds />),
        onClick: () => {
          this.props.loadPosts('/posts');
        }
      },
      {
        text: 'My Page',
        icon: (<UserPage />),
        onClick: () => {
          this.props.loadPosts('/u/kevinptt/posts');
        }
      },
    ];
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  onMenuListTap(fn) {
    fn.apply(this);
    this.handleToggle();
  }
  render() {
    const menuLists = this.menuItems.map((data, index) => (
      <LeftNavItem
        key={index}
        primaryText={data.text}
        handleClick={this.onMenuListTap.bind(this, data.onClick)}
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
