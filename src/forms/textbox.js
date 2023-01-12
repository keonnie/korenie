import FormBaseControl from './base'

/**
 * Input control for single line of text
 *
 * Usage:
 * <control-textbox></control-textbox>
 */
export default class TextboxControl extends FormBaseControl {
  /**
   * Event called before
   * the element is render
   */
  beforeRender() {
    super.beforeRender()

    let element = this._createPrincipal('input')
    element.type = 'text'
    this.innerHTML += element.outerHTML
  }
}
