import BaseControl from './base'
import './teaser.css'

/**
 * Expand/collapse text with `Read more`
 * and `Show less` functionality.
 *
 * Usage:
 * ```
 * <control-teaser>
 * </control-teaser>
 * ```
 */
export default class TeaserControl extends BaseControl {
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

    const text = this.textContent
    const teaser = text.slice(0, 50)
    const content = text.slice(50)

    let ellipsis = this.ownerDocument.createElement('span')
    ellipsis.classList.add('ellipsis')
    ellipsis.textContent = '...'

    let more = this.ownerDocument.createElement('span')
    more.classList.add('more')
    more.textContent = content

    let action = this.ownerDocument.createElement('a')
    action.href = '#'
    action.classList.add('action')
    action.textContent = 'Read more'
    this.innerHTML = [
      teaser,
      ellipsis.outerHTML,
      more.outerHTML,
      action.outerHTML,
    ].join('')

    this.querySelector('.action').addEventListener('click', this.#onClick(this))
  }

  /**
   * Flag if "more" content displayed
   * @return {Boolean}
   */
  get isExpanded() {
    const more = this.querySelector('.more')
    return (
      (more.offsetWidth || more.offsetHeight || more.getClientRects().length) >
      0
    )
  }

  /**
   * Flag if "more" content not displayed
   *
   * @returns {Boolean}
   */
  get isCollapsed() {
    return !this.isExpanded
  }

  /**
   * Hide "more" content
   *
   * @returns {void}
   */
  collapse() {
    if (this.isExpanded) return this.toogle()
  }

  /**
   * Show "more" content
   *
   * @returns {void}
   */
  expand() {
    if (this.isCollapsed) return this.toogle()
  }

  /**
   * Set the opposite state of hide/show "more" content
   * - if "more" content displayed, collapse and change
   * text to "Show less"
   * - if "more" content not displayed, expand it and change
   * text to "Read more"
   *
   * @returns {void}
   */
  toogle() {
    const link = this.querySelector('a')
    const more = this.querySelector('.more')
    const ellipsis = this.querySelector('.ellipsis')

    // Define the opposite state of each element
    // Basically, change to...
    link.textContent = this.isExpanded ? 'Read more' : 'Show less'
    // Note: Show/hiding ellipsis must be changed before
    // the "more" content otherwise `this.isExpanded` already
    // change state.
    ellipsis.style.display = this.isExpanded ? 'inherit' : 'none'
    more.style.display = this.isExpanded ? 'none' : 'inherit'
  }

  /**
   * Click event handler
   *
   * @param {TeaserControl} teaser
   * @returns {Function}
   */
  #onClick(teaser) {
    return (evt) => {
      evt.preventDefault()
      return teaser.toogle()
    }
  }
}
