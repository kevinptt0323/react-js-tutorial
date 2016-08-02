import React from 'react';
import request from 'superagent';
import prefix from 'superagent-prefix';

/* material-ui */
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { lightGreen400 } from 'material-ui/styles/colors';
import { PostDialog, PostList } from './components/Post';

/* icons */
import UserPage from 'material-ui/svg-icons/action/account-box';
import NewsFeeds from 'material-ui/svg-icons/action/picture-in-picture';
import Person from 'material-ui/svg-icons/social/person';

/* components */
import { LeftNav, LeftNavItem } from './components/LeftNav';
import { LoginDialog } from './components/Login';

const server = prefix('http://localhost:3000');
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen400,
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLeftIconButtonTouchTap = this.onLeftIconButtonTouchTap.bind(this);
    this.onLoginItemClick = this.onLoginItemClick.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.showPost = this.showPost.bind(this);

    this.state = {
      logined: false,
      username: 'kevinptt',
      posts: [],
      menuItems: [
        {
          primaryText: 'News Feed',
          leftIcon: (<NewsFeeds />),
          onTouchTap: () => {
            this.loadPosts('/posts');
            this.refs.leftNav.handleToggle();
          }
        }, {
          primaryText: 'My Page',
          leftIcon: (<UserPage />),
          onTouchTap: () => {
            this.loadPosts(`/u/${this.state.username}/posts`);
            this.refs.leftNav.handleToggle();
          },
        }
      ]
    };

    this.loadPosts();
  }
  onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
  onLoginItemClick() {
    this.refs.leftNav.handleToggle();
    this.refs.loginDialog.onRequestClose();
  }
  loadPosts(url = '/posts') {
    url = '/api' + url;
    request.get(url)
      .use(server)
      .accept('json')
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          this.setState({ posts: res.body });
        }
      });
  }
  showPost(post) {
    console.log('showPost');
    this.setState({ currentPost: post });
    this.refs.postDialog.onRequestClose();
  }
  render() {
    const fullSize = {
      width: '100vw',
      height: '100vh'
    };
    const containerStyle = {
      position: 'relative',
      height: 'calc(100% - 64px)',
      top: '64px'
    };
    const menuList = this.state.menuItems.map(({menuItem: MenuItem=null, ...data}, index) => (
      MenuItem ?
        MenuItem :
        <LeftNavItem key={index} {...data} />
    ));
    const LoginItem = (
      <LeftNavItem
        primaryText="Login"
        onTouchTap={this.onLoginItemClick}
        leftIcon={(<Person />)}
      />);

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={fullSize}>
          <AppBar
            onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
            style={{ position: 'fixed' }}
            title="Hello, world!"
          />
          <LeftNav ref="leftNav" username={this.state.username}>
            {menuList}
            <Divider />
            {LoginItem}
          </LeftNav>
          <div style={containerStyle}>
            <PostList showPost={this.showPost} posts={this.state.posts} />
          </div>
          <PostDialog ref="postDialog" data={this.state.currentPost} />
          <LoginDialog ref="loginDialog" prefix={prefix} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
