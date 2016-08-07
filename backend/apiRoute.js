const koaRouter = require('koa-router');
const { userCtrl, authCtrl, postCtrl, friendCtrl } = require('./Controllers');
const router = koaRouter({ prefix: '/api' });
const usersRouter = koaRouter();
const postsRouter = koaRouter();
const friendsRouter = koaRouter();

friendsRouter
  .get('/', friendCtrl.index)
  .post('/', friendCtrl.create)
;

usersRouter
  .param('username', function* (username, next) {
    this.username = username;
    yield next;
  })
  .get('/', userCtrl.index)
  .post('/', userCtrl.create)
  .get('/:username', userCtrl.show)
  .delete('/:username', userCtrl.destroy)
  .get('/:username/posts/', postCtrl.index)
  .use('/:username/friends', friendsRouter.routes())
;

postsRouter
  .param('pid', function* (pid, next) {
    this.pid = parseInt(pid);
    yield next;
  })
  .get('/', postCtrl.index)
  .post('/', postCtrl.create)
  .get('/:pid', postCtrl.show)
  .delete('/:pid', postCtrl.destroy)
;

router.use('/u', usersRouter.routes());
router.use('/posts', postsRouter.routes());
router
  .post('/login', userCtrl.login);

module.exports = router;
