import BaseControl from './base'

/**
 * Control to show paragraph with a title
 *
 * Usage:
 * ```
 * <control-titled-paragraph
 *   header="Title"
 *   value="Text">
 *   <h3>Title</h3>
 *   <p>Text</p>
 * </control-titled-paragraph>
 * ```
 */
export default class TitledParagraphControl extends BaseControl {
  /**
   * Invoked each time the custom element
   * is appended into a document-connected
   * element. This will happen each time the
   * node is moved, and may happen before the
   * element's contents have been fully parsed.
   * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
   */
  connectedCallback() {
    let head = this.ownerDocument.createElement('h3')
    head.textContent = this.dataset.header

    let p = this.ownerDocument.createElement('p')
    p.textContent = this.dataset.value

    this.innerHTML = [head.outerHTML, p.outerHTML].join('')
  }
}
