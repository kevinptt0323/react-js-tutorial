const router = require('koa-router')();

router.get('/', function* (next) {
  this.body = 'Hello, world';
});

module.exports = router;
