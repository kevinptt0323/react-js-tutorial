function* index(next) {
  const userCol = this.getCollection('users');
  let users = yield userCol.find({ });
  this.body = users;
  yield next;
}

function* create(next) {
  const userCol = this.getCollection('users');
  const { body: form=null } = this.request;
  if (form && form.username) {
    if (!(yield userCol.findOne({ username: form.username }))) {
      yield userCol.insert(form);
      this.username = form.username;
      yield show.apply(this, [next]);
    } else {
      this.status = 400;
      this.body = `Existed user "${form.username}"`;
      yield next;
    }
  } else {
    this.status = 400;
    this.body = 'Missing data';
    yield next;
  }
}

function* show(next) {
  const userCol = this.getCollection('users');
  const { username } = this;
  let user = (yield userCol.findOne({ username })) || {};
  if (Object.keys(user).length == 0) {
    this.status = 404;
    this.body = "Not found";
  } else {
    this.body = user;
  }
  yield next;
}

function* destroy(next) {
  const userCol = this.getCollection('users');
  const { username } = this;
  let user = (yield userCol.findOne({ username })) || {};
  if (Object.keys(user).length == 0) {
    this.status = 404;
    this.body = "Not found";
  } else {
    yield userCol.remove({ username });
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
