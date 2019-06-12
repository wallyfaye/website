export default ({ schema, tableName, where, columns = '*' }) => {
  const whereClause = where.reduce((accumulator, whereItem, idx) => {
    const { innerConditon = 'AND', outerConditon = 'AND', values } = whereItem
    const whereArray = Object.keys(values).map((key) => {
      const value = values[key]
      const dataType = schema[key].type

      return `${key} = ${(dataType === 'VARCHAR') ? `'${value}'` : `${value}`}`
    }).join(`${(innerConditon.toUpperCase() === 'AND') ? ' AND ' : ' OR '}`)

    accumulator += (idx === 0)
      ? `(${whereArray})`
      : ` ${outerConditon} (${whereArray})`

    return accumulator
  }, '')

  const query = `SELECT ${columns} FROM ${tableName} WHERE ${whereClause}`

  console.log(query)

  return query
}
