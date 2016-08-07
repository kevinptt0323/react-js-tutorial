function* index(next) {
  const postCol = this.getCollection('posts');
  const userCol = this.getCollection('users')
  let posts = {};
  if (this.username) {
    const { username } = this;
    let user = (yield userCol.findOne({ username })) || {};
    posts = yield postCol.find({ uid: user._id }, { sort: { created_at: -1 } });
    for (let i in posts) {
      posts[i].username = username;
    }
  } else {
    posts = yield postCol.find({}, { sort: { created_at: -1 } });
    for (let i in posts) {
      posts[i].username = (yield userCol.findOne({ _id: posts[i].uid })).username;
    }
  }
  this.body = posts;
  yield next;
}

function* create(next) {
  const userCol = this.getCollection('users');
  const postCol = this.getCollection('posts');
  const counterCol = this.getCollection('counter');
  const { body: form=null } = this.request;
  if (form && form.username) {
    const username = form.username;
    const user = yield userCol.findOne({ username });
    const pid = (yield counterCol.findOne({ key: 'posts' })).value + 1;
    let post_data = {
      pid, 
      uid: user._id,
      content: form.content,
      created_at: new Date()
    };
    let post = yield postCol.insert(post_data);
    yield counterCol.update( { key: 'posts' } , { $inc: { value: 1 } } );
    this.pid = pid;
    yield show.apply(this, [next]);
  } else {
    this.status = 400;
    this.body = 'Missing data';
    yield next;
  }
}

function* show(next) {
  const postCol = this.getCollection('posts');
  const { pid } = this;
  let post = (yield postCol.findOne({ pid })) || {};
  if (Object.keys(post).length == 0) {
    this.status = 404;
    this.body = "Not found";
  } else {
    this.body = post;
  }
  yield next;
}

function* destroy(next) {
  const postCol = this.getCollection('posts');
  const { pid } = this;
  let post = (yield postCol.findOne({ pid })) || {};
  if (Object.keys(post).length == 0) {
    this.status = 404;
    this.body = "Not found";
  } else {
    yield postCol.remove({ pid });
    this.body = 'Done';
  }
  yield next;
}

module.exports = {
  index,
  create,
  show,
  destroy
};
