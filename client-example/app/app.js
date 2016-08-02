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
import Exit from 'material-ui/svg-icons/action/exit-to-app';
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
    this.onLogoutItemClick = this.onLogoutItemClick.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.showPost = this.showPost.bind(this);
    this.postLogin = this.postLogin.bind(this);

    this.state = {
      isLogin: false,
      username: '',
      posts: [],
      menuItems: {
        newsFeed: {
          primaryText: 'News Feed',
          leftIcon: (<NewsFeeds />),
          onTouchTap: () => {
            this.loadPosts('/posts');
            this.refs.leftNav.handleToggle();
          }
        },
        myPage: {
          primaryText: 'My Page',
          leftIcon: (<UserPage />),
          onTouchTap: () => {
            this.loadPosts(`/u/${this.state.username}/posts`);
            this.refs.leftNav.handleToggle();
          }
        }
      }
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
  onLogoutItemClick() {
    this.refs.leftNav.handleToggle();
    this.setState({ isLogin: false, username: '' });
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
  postLogin(data) {
    this.setState({ isLogin: true, username: data.username });
    this.refs.loginDialog.onRequestClose();
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
    const menuList = [];
    menuList.push(<LeftNavItem key="0" {...this.state.menuItems.newsFeed} />);
    if (this.state.isLogin)
      menuList.push(<LeftNavItem key="1" {...this.state.menuItems.myPage} />);
    const LoginLogoutItem = (
      this.state.isLogin ?
        <LeftNavItem
          primaryText="Logout"
          onTouchTap={this.onLogoutItemClick}
          leftIcon={(<Exit />)}
        /> :
        <LeftNavItem
          primaryText="Login"
          onTouchTap={this.onLoginItemClick}
          leftIcon={(<Person />)}
        />
      );

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
            {LoginLogoutItem}
          </LeftNav>
          <div style={containerStyle}>
            <PostList showPost={this.showPost} posts={this.state.posts} />
          </div>
          <PostDialog ref="postDialog" data={this.state.currentPost} />
          <LoginDialog ref="loginDialog" postLogin={this.postLogin} server={server} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
