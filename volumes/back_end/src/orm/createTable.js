export default ({ schema = {}, tableName = '' }) => {
  const columns = Object.keys(schema).reduce((accumulator, key) => {
    const column = schema[key]
    const { type, characters, unique = false } = column
    const UNIQUE = (unique) ? 'UNIQUE' : ''

    return (accumulator += `${key} ${type}(${characters}) ${UNIQUE} NOT NULL`)
  }, '')

  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${columns})`

  console.log(query)

  return query
}
