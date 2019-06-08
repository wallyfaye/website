import server from './server'
import db from './db'

(async () => {
  server()
  const client = await db()

  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log(res.rows[0].message)
})()
