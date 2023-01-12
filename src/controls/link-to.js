import { Router } from '..'
// Import the sytle
import './link-to.css'

/**
 * Link to is a custom HTML element handling
 * redirection in the application similar to an
 * anchor but mainly focus on the application
 * itself
 */
export default class LinkTo extends HTMLElement {
  /**
   * Invoked each time the custom element
   * is appended into a document-connected
   * element. This will happen each time the
   * node is moved, and may happen before the
   * element's contents have been fully parsed.
   * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
   */
  connectedCallback() {
    this.#bindClick()
  }

  /**
   * Bind click event if a route
   * is defined
   * @returns {void}
   */
  #bindClick() {
    if (!this.attributes.route?.value) return

    let url = Router.parseURL(this.attributes.route.value)
    if (url.host !== globalThis.location.host) {
      throw new Error(
        'LinkTo should only be used for routing in the application. Use normal anchor for anything else.',
      )
    }

    this.addEventListener('click', () => {
      Router.transitionTo(url.href, this)
    })
  }
}
