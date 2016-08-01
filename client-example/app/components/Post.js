import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentBox: true
    }
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSendButtonClick = this.handleSendButtonClick.bind(this);
  }
  handleCommentChange(e) {
    this.setState({
      comment: event.target.value,
    });
  }
  handleSendButtonClick(e) {
  }
  render() {
    const { data: post = {} } = this.props;
    return (
      <Card zIndex={1} style={{ marginBottom: '1em' }}>
        <CardHeader
          title={post.username}
          subtitle={post.created_at}
          avatar={`http://lorempixel.com/100/100/nature/?uid=${post.uid}`}
        />
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
          <Post key={elem._id} data={elem} />
        ))
      }
      </Paper>
    );
  }
}

export { Post, PostList };
export default PostList;
