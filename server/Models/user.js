function User(db) {
  function* find(username) {
    let ret = yield db.get(getKey.apply(this, [username]));
    if (!!ret) {
      ret = JSON.parse(ret);
    } else {
      ret = {};
    }
    return ret;
  }

  function* save(next) {
    yield db.sadd('users', this[_primaryKey]);
    yield db.set(getKey.apply(this), toJSON.apply(this));
  }
  
  function getKey(username=this[_primaryKey]) {
    return `_USERS_${username}`;
  }

  function toJSON() {
    let obj = { };
    _columns.forEach((elem) => {
      obj[elem] = this[elem];
    });
    return JSON.stringify(obj);
  }

  const _primaryKey = "username";
  const _columns = ['username', 'password'];

  return {
    find,
    save,
    toJSON
  };
}

module.exports = User;

