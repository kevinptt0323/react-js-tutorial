import React from 'react';
import { AppBar } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palatte: {
    primary1Color: indigo500,
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    let { setToken, getToken, login, onLogin } = this;
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
            Hello, world!
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
