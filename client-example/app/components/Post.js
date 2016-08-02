import React from 'react';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import OpenInNew from 'material-ui/svg-icons/action/open-in-new';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentBox: true
    }
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSendButtonClick = this.handleSendButtonClick.bind(this);
    this.onFullscreen = this.onFullscreen.bind(this);
  }
  handleCommentChange(e) {
    this.setState({
      comment: event.target.value,
    });
  }
  handleSendButtonClick(e) {
  }
  onFullscreen(e) {
    this.props.showPost(this.props.data);
  }
  render() {
    const { data: post = {} } = this.props;
    return (
      <Card style={this.props.style}>
        <CardHeader
          title={post.username}
          subtitle={post.created_at}
          avatar={`http://lorempixel.com/100/100/nature/?uid=${post.uid}`}
        >
          <div style={{ position: 'relative', float: 'right', display: 'inline-block' }}>
            <div style={{ position: 'absolute', right: 0 }}>
              <IconButton
                iconStyle={{ width: 20, height: 20 }}
                style={{ width: 40, height: 40, padding: 10 }}
                onTouchTap={this.onFullscreen}
              >
                <OpenInNew />
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardText>
          {post.content}
        </CardText>
        <CardActions style={{ display: 'flex' }}>
          <div style={{ flex: '1', display: 'flex', alignItems: 'center', paddingLeft: '5px' }}>
            <TextField hintText="說點什麼吧" fullWidth={true} onChange={this.handleCommentChange} />
            <FlatButton label="送出" onTouchTap={this.handleSendButtonClick} />
            <FlatButton primary={true} label="讚" />
          </div>
        </CardActions>
      </Card>
    );
  }
}
class PostList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Paper>
      {
        this.props.posts.map((elem) => (
          <Post
            key={elem._id}
            data={elem}
            showPost={this.props.showPost}
            style={{ marginBottom: '1em' }}
          />
        ))
      }
      </Paper>
    );
  }
}

class PostDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onRequestClose = this.onRequestClose.bind(this);
    this.customContentStyle = {
      width: '80%',
      minWidth: '360px',
      maxWidth: 'none'
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
        bodyStyle={{ padding: '0' }}
        contentStyle={this.customContentStyle}
      >
        <Post
          data={this.props.data}
        />
      </Dialog>
    );
  }
}

export { Post, PostDialog, PostList };
