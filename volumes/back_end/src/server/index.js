import Koa from 'koa'

export default () => {
  const app = new Koa()

  app.use(ctx => {
    console.log('test')
    ctx.body = 'Hello Koa'
  })

  app.listen(8080)

  return app
}
