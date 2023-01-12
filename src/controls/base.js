import { dasherize, underscore } from 'inflected'

import { parseLiterals } from '../helpers'

/**
 * Base control for inheritence
 * Contains any base necessary action and setup
 * that a control would most of the time require
 */
export default class BaseControl extends HTMLElement {
  /**
   * Class static getter mainly for getting
   * the control name
   * @returns {String}
   */
  static get tagName() {
    let name_parts = dasherize(underscore(this.name)).split('-')
    name_parts.unshift(name_parts.pop())
    return name_parts.join('-').toUpperCase()
  }

  // Public properties
  tagName = this.constructor.tagName
  // Protected properties
  _yield_content

  /**
   * Invoked each time the custom element
   * is appended into a document-connected
   * element. This will happen each time the
   * node is moved, and may happen before the
   * element's contents have been fully parsed.
   * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
   */
  connectedCallback() {
    if (!this._view) return this

    this.innerHTML = parseLiterals(this._view, {
      ...this.dataset,
      yield: this._yield_content,
    })
  }
}
