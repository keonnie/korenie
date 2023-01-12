import './base.css'
import { BaseControl } from '../controls'
import { camelize } from 'inflected'

/**
 * Base for any form control
 */
export default class FormBaseControl extends BaseControl {
  /**
   * Declare attributes to be observed
   * @returns {[String]} List of observed
   */
  static get observedAttributes() {
    return ['onPopulate']
  }

  // Protected variables
  _data
  _onPopulate

  /**
   * Setter to defined the callback
   * when event populate is called.
   * @param {Function} fn
   */
  set onPopulate(fn) {
    this._onPopulate = fn
    this.populate()
  }

  /**
   * Event called before element
   * connected
   */
  beforeConnected() {
    if (this.dataset.id && /^\d/.test(this.dataset.id)) {
      this.dataset.id = `dw${this.dataset.id}`
    }

    if (this.dataset.name && !this.dataset.id) {
      this.dataset.id = this.dataset.name
    }

    if (this.dataset.id && !this.dataset.name) {
      this.dataset.name = this.dataset.id
    }

    if (!this.dataset.id && !this.dataset.name) {
      let firstRange = Math.floor(Math.random() * 999)
      let secondRange = Math.floor(Math.random() * 999)
      this.dataset.id = `dw${firstRange}${secondRange}`
      this.dataset.name = this.dataset.id
    }
  }

  /**
   * Event called before
   * the element is render
   */
  beforeRender() {
    if (this.dataset.label) {
      let label = globalThis.document.createElement('label')
      label.htmlFor = this.dataset.id
      label.textContent = this.dataset.label
      this.innerHTML = label.outerHTML + this.innerHTML
    }
  }

  /**
   * Invoked each time the custom element
   * is appended into a document-connected
   * element. This will happen each time the
   * node is moved, and may happen before the
   * element's contents have been fully parsed.
   * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
   */
  connectedCallback() {
    this.classList.add('dw-form-controls')

    this.beforeConnected()

    super.connectedCallback()

    this.beforeRender()

    if (this.dataset.description) {
      let description = globalThis.document.createElement('p')
      description.textContent = this.dataset.description
      description.classList.add('descriptions')

      this.innerHTML += description.outerHTML
    }
  }

  /**
   * Trigger event populate
   */
  populate() {
    this._data = null

    if (typeof this._onPopulate !== 'function') return

    this._data = this._onPopulate()
    this._populated()
  }

  /**
   * Loop over all children of the element
   * and check their validity by calling
   * `reportValidity` if responding to it.
   */
  reportValidity() {
    return !this.children.some((c) => {
      // If no reportValidity method, nothing to report
      // Return false so it's not filtered in
      if (!(typeof c.reportValidity === 'function')) return false

      return !c.reportValidity()
    })
  }

  /**
   * Create principal element
   * of the control
   * @param {String} element_name
   * @returns {HTMLElement}
   */
  _createPrincipal(element_name) {
    let dataset = { ...this.dataset }
    let element = this._createChild(element_name, dataset)
    element.classList.add('dw-form-controls__principals')
    return element
  }

  /**
   * Create a child element with its
   * dataset. Each key of the dataset
   * will be bind to the element.dataset
   * @param {String} element_name
   * @param {{*}?} dataset
   * @returns {HTMLElement}
   */
  _createChild(element_name, dataset = {}) {
    let element = this.ownerDocument.createElement(element_name)

    for (let [k, v] of Object.entries(dataset)) {
      let key = camelize(k, false)
      if (!(key in element)) continue

      element.setAttribute(key, v)
      delete dataset[k]
    }

    Object.assign(element.dataset, dataset)
    return element
  }

  /**
   * Allow subclass to bind
   * logic once child element
   * has been populated.
   * @abstract
   */
  _populated() {}
}
