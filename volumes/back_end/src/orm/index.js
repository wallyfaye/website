// import database from '../database'

// const init = async () => {
//   const db = await database()
//   const res = await db.query('SELECT $1::text as message', ['Hello world!'])

//   return res.rows[0].message
// }

export default async (models = {}) => {
  const modelObjects = {}
  // const modelObjects = await init()

  Object.keys(models).map((model) => {
    // get the schema and create a db representation
    console.log(models[model].schema)
    modelObjects[model] = models[model]
  })

  return modelObjects
}
