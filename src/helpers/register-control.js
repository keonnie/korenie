import { dasherize, underscore } from 'inflected'

/**
 * Register control to global
 * @param {Class} klass
 * @param {String} custom
 */
export function registerControl(klass, custom = null) {
  if (!klass) throw new Error('`klass` is required')

  if (!(klass.prototype instanceof HTMLElement)) {
    throw new Error('Control must be a descendant of HTMLElement')
  }

  let control_name = custom

  if (!control_name) {
    let name_parts = dasherize(underscore(klass.name)).split('-')
    name_parts.unshift(name_parts.pop())

    control_name = name_parts.join('-').toLowerCase()
  }

  if (!globalThis.customElements.get(control_name)) {
    globalThis.customElements.define(control_name, klass)
  }
}
