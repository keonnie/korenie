import TextboxControl from './textbox'

/**
 * Input control to handle password
 *
 * Usage:
 * ```
 * <control-password></control-password>
 * ```
 */
export default class PasswordControl extends TextboxControl {
  /**
   * Event called before
   * the element is render
   */
  beforeRender() {
    super.beforeRender()

    let element = this.querySelector('input[type="text"]')
    element.type = 'password'
    element.autocomplete = 'off'
  }
}
