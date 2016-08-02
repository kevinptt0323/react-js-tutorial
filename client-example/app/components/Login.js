import React from 'react';
import update from 'react-addons-update';
import { Avatar, Dialog, TextField, RaisedButton } from 'material-ui';

import request from 'superagent';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      inputData: { },
      errorText: { }
    };
  }
  _checkEmpty(key, e, onFulfilled, onRejected) {
    let errorText2 = {}, inputData2 = {};

    if( e ) {
      inputData2[key] = e.target.value;
      inputData2 = update(this.state.inputData, {$merge: inputData2});
    } else {
      inputData2 = this.state.inputData;
    }

    errorText2[key] = inputData2[key] ? '' : '不可為空白',
    errorText2 = update(this.state.errorText, {$merge: errorText2});

    this.setState({
      errorText: errorText2,
      inputData: inputData2,
      noEmptyInput: !!inputData2.username && !!inputData2.password
    }, () => {
      if( this.state.noEmptyInput ) {
        if (typeof onFulfilled === 'function') {
          onFulfilled();
        }
      } else {
        if (typeof onRejected === 'function') {
          onRejected();
        }
      }
    });
  }
  login() {
    let check = (field) =>
      new Promise((resolve, reject) => {
        this._checkEmpty(field, null, resolve, reject);
      })
    ;
    let { onLogin } = this.props;
    check('username')
      .then(() => check('password'), () => check('password'))
      .then(() => {
        let data = {
          account: this.state.inputData.username,
          passwd: this.state.inputData.password
        };
        request.post('/api/login')
          .send(data)
          .use(this.props.prefix)
          .accept('json')
          .end((err, res) => {
            if( err ) {
              console.error(err);
            } else {
              this.props.setToken(res.body.data.token, onLogin);
            }
          });
      }, () => {
        console.error("failed");
      })
      ;
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}
      >
        <Avatar size={70} style={{alignSelf: 'center'}}>L</Avatar>
        <TextField
          floatingLabelText="Username"
          errorText={this.state.errorText.username||""}
          fullWidth={true}
          onChange={this._checkEmpty.bind(this, 'username')}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          errorText={this.state.errorText.password||""}
          fullWidth={true}
          onChange={this._checkEmpty.bind(this, 'password')}
        />
        <div style={{marginTop: 24, display: 'inline-block'}}>
          <RaisedButton label="Login" primary={true} onTouchTap={this.login} />
        </div>
      </div>
    );
  }
}

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onRequestClose = this.onRequestClose.bind(this);
    this.customStyle = {
    };
  }
  onRequestClose(open = !this.state.open) {
    this.setState({ open })
  }
  render() {
    return (
      <Dialog
        open={this.state.open}
        modal={false}
        onRequestClose={this.onRequestClose}
        contentStyle={{ width: '400' }}
      >
        <LoginForm
          data={this.props.data}
        />
      </Dialog>
    );
  }
}

export { LoginForm, LoginDialog };
