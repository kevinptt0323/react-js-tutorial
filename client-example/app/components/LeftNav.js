import React, { PropTypes } from 'react';
import { Drawer } from 'material-ui';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      open: false,
    };
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  onMenuListTap(fn) {
    fn.apply(this);
    this.handleToggle();
  }
  render() {
    return (
      <Drawer
        width={300}
        docked={false}
        open={this.state.open}
        onRequestChange={this.handleToggle}
      >
        <img src="img/sidenav-wallpaper.png" style={{width: "100%"}} />
        {this.props.children}
      </Drawer>
    );
  }
}

export default LeftNav;
