// Import style
import './text-area.css'

import FormBaseControl from './base'

/**
 * Input control for enter multi-line of text
 *
 * Usage:
 * ```
 * <control-textarea></control-textarea>
 * ```
 */
export default class TextareaControl extends FormBaseControl {
  /**
   * Event called before
   * the element is render
   */
  beforeRender() {
    super.beforeRender()

    let element = this._createPrincipal('textarea')
    this.innerHTML += element.outerHTML

    this.addEventListener('input', (evt) => {
      evt.target.style.height = `${evt.target.scrollHeight}px`
    })
  }
}
