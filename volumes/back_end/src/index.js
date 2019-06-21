import server from './server'
import orm from './orm'
import { Page } from './models'

(async () => {
  // migrations
  const models = await orm({
    Page
  })

  // seeds
  await models.Page.insert({
    name: 'home'
  })

  // server
  server()
})()

console.log('starting')
