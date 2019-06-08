import Koa from 'koa'

export default () => {
  const app = new Koa()

  app.listen(8080)

  return app
}
