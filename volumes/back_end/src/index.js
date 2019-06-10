import server from './server'
import orm from './orm'
import { Page } from './models'

(async () => {
  const app = server()

  const models = await orm({
    Page
  })

  const home = new models.Page.Model({
    name: 'home'
  })

  app.use(ctx => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    ctx.body = {
      test: `Hello Koa - ${home.name}`
    }
  })
})()
