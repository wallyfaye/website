import server from './server'
import orm from './orm'
import { page } from './models'

(async () => {
  const app = server()

  const models = await orm({
    Page: page
  })

  const home = new models.Page({
    name: 'home'
  })

  app.use(ctx => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    ctx.body = {
      test: `Hello Koa - ${home.name}`
    }
  })
})()
