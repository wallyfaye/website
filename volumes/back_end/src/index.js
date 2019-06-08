import server from './server'
import db from './db'

(async () => {
  const app = server()
  const client = await db()

  const res = await client.query('SELECT $1::text as message', ['Hello world!'])

  app.use(ctx => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    ctx.body = {
      test: `Hello Koa - ${res.rows[0].message}`
    }
  })
})()
