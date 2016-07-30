import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { lightGreen400 } from 'material-ui/styles/colors';
import PostList from './components/PostList';

import request from 'superagent';
import prefix from 'superagent-prefix';

const server = prefix('http://localhost:3000');

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen400,
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logined: false,
      posts: []
    };

    this.loadPosts();
  }
  loadPosts() {
    request.get('/api/posts')
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
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{width: '100vw', height: '100vh'}}>
          <AppBar
            style={{ position: 'fixed' }}
            title="Hello, world!"
          />
          <div
            style={{
              position: 'relative',
              height: 'calc(100% - 64px)',
              top: '64px'
            }}
          >
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
