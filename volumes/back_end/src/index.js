const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  console.log('test')
  ctx.body = 'Hello Koa';
});

app.listen(8080);
