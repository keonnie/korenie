/**
 * Mock form data for happy-dom
 * as no support yet.
 */
class FormDataMock {
  #form
  #children

  /**
   * Constructor
   * @param {HTMLFormElement} form
   */
  constructor(form) {
    this.#form = form
    this.#children = this.#form.querySelectorAll('[name]')
  }

  /**
   * Get the value of the field
   * by name
   * @param {String} name
   * @returns {String} Value of the field
   */
  get(name) {
    return this.#form.querySelector(`[name="${name}"]`).value
  }

  /**
   * Get all fields' value for
   * the name provided
   * @param {String} name
   * @returns {String[]}
   */
  getAll(name) {
    let fields = this.#form.querySelectorAll(`[name="${name}"]`)

    return Array.from(fields).reduce((acc, f) => {
      if ('checked' in f) {
        if (f.checked) {
          acc.push(f.value)
        }
      }

      return acc
    }, [])
  }

  /**
   * Allow iteration for all key/value
   * @returns {Array<Array<key,value>>}
   */
  [Symbol.iterator]() {
    let index = -1
    let data = this.#children.reduce((acc, el) => {
      acc.push([el.name, el.value])
      return acc
    }, [])

    return {
      next: () => ({ value: data[++index], done: !(index in data) }),
    }
  }
}

globalThis.FormData = FormDataMock
