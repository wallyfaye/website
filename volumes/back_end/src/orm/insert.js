export default ({ schema, tableName, data }) => {
  const { columns, values } = Object.keys(schema)
    .reduce((accumulator, key) => {
      if (data[key]) {
        accumulator.columns.push(key)
        accumulator.values.push(data[key])
      }

      return accumulator
    }, {
      columns: [],
      values: []
    })

  const query = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES ('${values.join(',')}') ON CONFLICT DO NOTHING`

  console.log(query)

  return query
}
