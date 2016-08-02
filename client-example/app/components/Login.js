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
    check('username')
      .then(() => check('password'), () => check('password'))
      .then(() => {
        const { username, password } = this.state.inputData;
        request.post('/api/login')
          .send({ username, password })
          .use(this.props.server)
          .accept('json')
          .end((err, res) => {
            if( err ) {
              console.error(err);
              this.setState({ errorText: { overall: "登入失敗" }})
            } else {
              this.props.postLogin(res.body);
            }
          });
      }, () => {
        console.error("failed");
      });
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
        <div style={{ margin: '24px 0 12px', textAlign: 'center' }}>
          <RaisedButton label="Login" primary={true} onTouchTap={this.login} />
        </div>
        <div style={{ textAlign: 'center', color: 'red', fontSize: '12px' }}>
          { this.state.errorText.overall }
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
    const { data, postLogin, server } = this.props;
    return (
      <Dialog
        open={this.state.open}
        modal={false}
        onRequestClose={this.onRequestClose}
        contentStyle={{ width: '400' }}
      >
        <LoginForm
          {...{data, postLogin, server}}
        />
      </Dialog>
    );
  }
}

export { LoginForm, LoginDialog };
