import database from '../database'

const createTable = (params = {}) => {
  const { Model, db, schema } = params
  const { name: constructorName } = Model

  const tableName = constructorName.toLowerCase()

  const columns = Object.keys(schema).reduce((accumulator, key) => {
    const column = schema[key]
    const { type, characters } = column

    return (accumulator += `${key} ${type} (${characters}) NOT NULL`)
  }, '')

  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${columns})`

  console.log(query)

  return db.query(query)
}

const insert = ({ model }) => {
  // const { name: constructorName } = model

  // const tableName = constructorName.toLowerCase()

  console.log('insert')
}

export default async (models = {}) => {
  const modelObjects = {}
  const db = await database()

  for (const model of Object.keys(models)) {
    await createTable({
      db,
      ...models[model]
    })

    modelObjects[model] = {
      insert: () => {
        insert({
          model: models[model]
        })
      }
    }
  }

  return modelObjects
}
