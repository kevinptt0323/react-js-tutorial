import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data: post = {} } = this.props;
    return (
      <Card>
        <CardHeader
          title={post.username}
          subtitle={post.created_at}
          avatar={`http://lorempixel.com/100/100/nature/?uid=${post.uid}`}
        />
        <CardText>
          {post.content}
        </CardText>
        <CardActions>
          <FlatButton label="讚" />
          <FlatButton label="留言" />
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
          <Post data={elem} />
        ))
      }
      </Paper>
    );
  }
}

export { Post, PostList };
export default PostList;
