export default class Page {
  constructor (params = {}) {
    const { name } = params
    this.schema = {
      type: 'varchar',
      characters: 256
    }

    this.name = {
      ...this.schema,
      value: name
    }
  }

  set name ({ characters, value }) {
    console.log('value', value)
    try {
      if (!value || typeof value !== 'string') {
        throw new Error('pageName must be defined as a string')
      }

      if (value.length > characters) {
        throw new Error(`pageName must be less than ${characters}`)
      }

      this.nameValue = value
    } catch (e) {
      console.log(e)

      throw e
    }
  }

  get name () {
    if (!this.nameValue) {
      throw new Error('name has not been set')
    }

    return this.nameValue
  }
}
