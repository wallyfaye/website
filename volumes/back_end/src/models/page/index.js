const schema = {
  name: {
    type: 'VARCHAR',
    characters: 256
  }
}

export default {
  schema,
  Model: class Page {
    constructor (params = {}) {
      const { name } = params

      this.name = {
        ...schema.name,
        value: name
      }
    }

    set name ({ characters, value }) {
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

}
