const koa = require('koa');
const koaBody = require('koa-body')();
const db = require('monk')('localhost/react-js-tutorial')
const wrap = require('co-monk');

const siteRoute = require('./siteRoute')
const apiRoute  = require('./apiRoute')

const { HOST="0.0.0.0", PORT=3000 } = process.env;

const app = koa();

app.context.getCollection = function(name) {
  return wrap(db.get(name));
};

app
  .use(koaBody)
  .use(siteRoute.routes())
  .use(siteRoute.allowedMethods())
  .use(apiRoute.routes())
  .use(apiRoute.allowedMethods())
  .use(function* (next) {
    if ("string" == typeof this.body) {
      this.body = { "message": this.body };
    }
  });

app.listen({ host: HOST, port: PORT }, () => {
  console.log(`koa server listen at ${HOST}:${PORT}`);
});
