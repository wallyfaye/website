import database from '../database'
import createTable from './createTable'
import insert from './insert'
import select from './select'

export default async (models = {}) => {
  const modelObjects = {}
  const db = await database()

  for (const model of Object.keys(models)) {
    const { Model, schema } = models[model]
    const { name: constructorName } = Model
    const tableName = constructorName.toLowerCase()

    const createTableQuery = createTable({
      schema,
      tableName
    })

    await db.query(createTableQuery)

    modelObjects[model] = {
      insert: async (data) => {
        const query = insert({
          schema,
          tableName,
          data
        })

        await db.query(query)
      },
      select: async ({ where = {} }) => {
        const query = select({
          schema,
          tableName,
          where
        })

        const result = await db.query(query)

        return result
      }
    }
  }

  return modelObjects
}
