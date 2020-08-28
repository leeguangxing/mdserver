const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const json = require('koa-json')
const bodyparser = require('koa-bodyparser')

const port = 3003;

// middlewares
app.use(bodyparser())
  .use(json())
  .use(router.routes())
  .use(router.allowedMethods())

app.context.bs = require("browser-sync").create();
app.context.bs.init(require('./bs-config'));

router.get('/', async (ctx, next) => {
  ctx.bs.reload();
  ctx.res.end();
})

app.on('error', function(err, ctx) {
  console.err(err)
})

module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
