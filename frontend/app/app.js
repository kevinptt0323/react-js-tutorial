import React from 'react';
import request from 'superagent';
import prefix from 'superagent-prefix';

/* material-ui */
import { AppBar } from 'material-ui';
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

const server = prefix('http://n1.kevchentw.nctu.me:3000');
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen400,
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLeftIconButtonTouchTap = this.onLeftIconButtonTouchTap.bind(this);
    this.loadPosts = this.loadPosts.bind(this);

    this.state = { };
  }
  onLeftIconButtonTouchTap() {
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
  render() {
    const fullSize = {
      width: '100vw',
      height: '100vh',
      position: 'absolute'
    };
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={fullSize}>
          <AppBar
            onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
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
            Hello, world!
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
