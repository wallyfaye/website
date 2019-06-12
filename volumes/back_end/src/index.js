import server from './server'
import orm from './orm'
import { Page } from './models'

(async () => {
  const app = server()

  // pass in models to orm so that tables can be created and do migrations as needed
  const models = await orm({
    Page
  })

  // seed the data with what is needed
  await models.Page.insert({
    name: 'home'
  })

  const home = await models.Page.select({
    where: [
      {
        innerConditon: 'and',
        values: {
          name: 'home'
        }
      },
      {
        innerConditon: 'and',
        outerConditon: 'and',
        values: {
          name: 'home'
        }
      }
    ]
  })

  // render the data
  app.use(ctx => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    ctx.body = {
      test: `Hello Koa - ${home.rows[0].name}`
    }
  })
})()

console.log('starting')
