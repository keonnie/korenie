import BaseControl from './base'
import './button.css'

/**
 * Branded button control for
 * displaying button
 *
 * Usage:
 * ```
 * <control-button data-text="Submit">
 * </control-button>
 * ```
 */
export default class ButtonControl extends BaseControl {
  /**
   * Invoked each time the custom element
   * is appended into a document-connected
   * element. This will happen each time the
   * node is moved, and may happen before the
   * element's contents have been fully parsed.
   * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
   */
  connectedCallback() {
    super.connectedCallback()

    this.textContent = this.dataset.text

    this.addEventListener('click', this.#listenToAction)
  }

  /**
   * Listener for click event
   * to trigger action
   * @param {HTMLEvent} evt
   */
  #listenToAction(evt) {
    if (typeof evt.target.onClick === 'function') {
      evt.target.onClick(evt)
    }
  }
}
