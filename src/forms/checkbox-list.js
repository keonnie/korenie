import FormBaseControl from './base'

import './checkbox-list.css'

/**
 * Create container with checkbox elements
 * and their label
 *
 * Usage:
 * ```
 * <control-checkbox-list>
 *   <control-checkbox></control-checkbox>
 * </control-checkbox-list>
 * ```
 */
export default class CheckboxListControl extends FormBaseControl {
  /**
   * Callback once the data for the
   * checkbox are available to populate
   * the checkbox element.
   */
  _populated() {
    super._populated()

    if (!this._data) return

    /**
     * Setting will be plain object
     * {
     *   label: String,
     *   value: String,
     * }
     */
    for (let setting of this._data) {
      let checkbox = this._createChild('control-checkbox', setting)
      this.append(checkbox)
    }
  }
}
