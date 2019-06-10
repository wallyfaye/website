import database from '../database'

const createTable = async (params = {}) => {
  const { Model, db, schema } = params
  const { name } = Model

  const res = await db.query(
    `
      CREATE TABLE IF NOT EXISTS ${name.toLowerCase()}(
        ${'name'} ${schema.name.type} (${schema.name.characters}) NOT NULL
      )
    `
  )

  console.log(res)
}

export default async (models = {}) => {
  const modelObjects = {}
  const db = await database()

  for (const model of Object.keys(models)) {
    await createTable({
      db,
      ...models[model]
    })
    modelObjects[model] = models[model]
  }

  return modelObjects
}
