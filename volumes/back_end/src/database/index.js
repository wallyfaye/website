import { Client } from 'pg'

const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB } = process.env

export default async () => {
  const client = new Client({
    user: POSTGRES_USER,
    host: 'db',
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432
  })

  await client.connect()

  return client
}
