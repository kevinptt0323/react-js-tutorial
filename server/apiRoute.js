const router = require('koa-router')({ prefix: '/api' });
const { userCtrl, authCtrl, postCtrl } = require('./Controllers');

router

  .param('username', function* (username, next) {
    this.username = username;
    yield next;
  })
  .get('/users/', userCtrl.index)
  .post('/users/', userCtrl.create)
  .get('/users/:username', userCtrl.show)
  .delete('/users/:username', userCtrl.destroy)

  //.post('/login', authCtrl.login)

  .param('pid', function* (pid, next) {
    this.pid = parseInt(pid);
    yield next;
  })
  .get('/posts/', postCtrl.index)
  .post('/posts/', postCtrl.create)
  .get('/posts/:pid', postCtrl.show)
  .delete('/posts/:pid', postCtrl.destroy)

;

module.exports = router;
