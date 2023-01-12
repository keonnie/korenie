import FormBaseControl from './base'

import './checkbox.css'

/**
 * Control checkbox to create checkbox
 *
 * Usage:
 * ```
 * <control-checkbox>
 *   <input type="checkbox">
 *   <label>Text</label>
 * </control-checkbox>
 * ```
 */
export default class CheckboxControl extends FormBaseControl {
  /**
   * Overwrite before render
   * as label need to be displayed
   * after the checkbox
   */
  beforeRender() {
    let checkbox = this._createPrincipal('input')
    checkbox.type = 'checkbox'
    checkbox.id = `chx-${this.id}`
    this.append(checkbox)

    if (this.dataset.label) {
      let label = this._createChild('label')
      label.htmlFor = checkbox.id
      label.textContent = this.dataset.label
      this.append(label)
    }
  }
}
