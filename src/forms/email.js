import TextboxControl from './textbox'

/**
 * Input control for email only
 *
 * Usage:
 * ```
 * <control-email></control-email>
 * ```
 */
export default class EmailControl extends TextboxControl {
  /**
   * Event called before
   * the element is render
   */
  beforeRender() {
    super.beforeRender()

    this.querySelector('input[type="text"]').type = 'email'
  }
}
