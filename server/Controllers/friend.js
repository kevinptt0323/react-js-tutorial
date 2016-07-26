function* index(next) {
  const userCol = this.getCollection('users')
  const { username } = this;
  let user = (yield userCol.findOne({ username })) || {};

  const friendCol = this.getCollection('friend_relations');
  let friends = yield friendCol.find({ $or: [{uid1: user._id}, {uid2: user._id}] });
  friends = friends || [];
  let ret = []
  for (let { uid1, uid2 } of friends) {
    let uid = String(uid1) != String(user._id) ? uid1 : uid2;
    ret.push(yield userCol.findOne({ _id: uid }, 'username'));
  }
  this.body = ret;
  yield next;
}

function* create(next) {
  const userCol = this.getCollection('users');
  const { body: { username1, username2 } } = this.request;
  let user1 = (yield userCol.findOne({ username: username1 })) || {};
  let user2 = (yield userCol.findOne({ username: username2 })) || {};

  const friendCol = this.getCollection('friend_relations');
  let record = {
    uid1: user1._id,
    uid2: user2._id
  };
  let record2 = {
    uid1: user2._id,
    uid2: user1._id
  }
  let exist = !!(yield friendCol.findOne({ record })._id);
  if (exist) {
    this.body = "You have been friend";
  } else {
    let friendRel = yield friendCol.insert(record);
    this.body = "OK";
  }
  yield next;
}

module.exports = {
  index,
  create
};
