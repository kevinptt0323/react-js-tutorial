import React from 'react';
import request from 'superagent';
import prefix from 'superagent-prefix';

/* material-ui */
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { lightGreen400 } from 'material-ui/styles/colors';

/* icons */
import UserPage from 'material-ui/svg-icons/action/account-box';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import NewsFeeds from 'material-ui/svg-icons/action/picture-in-picture';
import Person from 'material-ui/svg-icons/social/person';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

/* components */
import { LeftNav, LeftNavItem } from './components/LeftNav';
import { LoginDialog } from './components/Login';
import { NewUserDialog } from './components/NewUser';
import { PostDialog, PostList, PostBoard } from './components/Post';

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
    this.onNewUserItemClick = this.onNewUserItemClick.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.showPost = this.showPost.bind(this);
    this.postLogin = this.postLogin.bind(this);
    this.postNewUser = this.postNewUser.bind(this);

    this.state = {
      isLogin: false,
      username: '',
      title: '最新文章',
      posts: [],
      menuItems: {
        newsFeed: {
          primaryText: 'News Feed',
          leftIcon: (<NewsFeeds />),
          onTouchTap: () => {
            this.loadPosts('/posts');
            this.setState({ title: '最新文章' });
            this.refs.leftNav.handleToggle();
          }
        },
        myPage: {
          primaryText: 'My Page',
          leftIcon: (<UserPage />),
          onTouchTap: () => {
            this.loadPosts(`/u/${this.state.username}/posts`);
            this.setState({ title: '我的文章' });
            this.refs.leftNav.handleToggle();
          }
        }
      }
    };

    this.loadPosts('/posts');
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
    this.loadPosts('/posts');
  }
  onNewUserItemClick() {
    this.refs.leftNav.handleToggle();
    this.refs.newUserDialog.onRequestClose();
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
  postNewUser(data) {
    this.refs.newUserDialog.onRequestClose();
    this.refs.loginDialog.onRequestClose();
  }
  render() {
    const fullSize = {
      width: '100vw',
      height: '100vh',
      position: 'absolute'
    };
    const containerStyle = {
      position: 'relative',
      height: 'calc(100% - 64px)',
      top: '64px'
    };
    const subheaderStyle = { lineHeight: '36px' };
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
            title={this.state.title}
          />
          <LeftNav ref="leftNav" username={this.state.username}>
            {menuList}
            <Divider />
            <Subheader style={subheaderStyle}>帳號管理</Subheader>
            <LeftNavItem
              primaryText="New User"
              onTouchTap={this.onNewUserItemClick}
              leftIcon={(<PersonAdd />)}
            />
            {LoginLogoutItem}
          </LeftNav>
          <div style={containerStyle}>
            {
              this.state.isLogin ?
              <PostBoard
                style={{ margin: '1em' }}
                hintText={`${this.state.username}，你好嗎？`}
                server={server}
                loadPosts={this.loadPosts}
                username={this.state.username}
              /> : null
            }
            <PostList showPost={this.showPost} posts={this.state.posts} />
          </div>
          <PostDialog ref="postDialog" data={this.state.currentPost} />
          <LoginDialog ref="loginDialog" postLogin={this.postLogin} server={server} />
          <NewUserDialog ref="newUserDialog" postNewUser={this.postNewUser} server={server} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
