import { registerControl } from './helpers'
import { BaseView } from './controls'

/**
 * Handle routing in the application
 */
class Router {
  #routes

  /**
   * Constructor
   */
  constructor() {
    this.#routes = new Map()
  }

  /**
   * Getter for routes
   * @returns {Map(
   *   URLPattern,
   *   View
   * )}
   */
  get routes() {
    return this.#routes
  }

  /**
   * Get the current view
   * @returns {{
   *   tag: String
   * }}
   */
  get viewer() {
    let current = new URL(globalThis.location.href)

    // TODO: Handle when no pattern match

    const [route, callbacks] = this.#route

    let view = callbacks.find((c) => c.prototype instanceof BaseView)
    registerControl(view)

    let attributes = Object.entries(route.exec(current).pathname.groups).map(
      ([k, v]) => {
        return `data-${k}="${v}"`
      },
    )

    let opening_tag = [view.tagName.toLowerCase(), attributes.join(' ')]

    return {
      tag: `<${opening_tag.join(' ').trim()}></${view.tagName.toLowerCase()}>`,
    }
  }

  /**
   * Append domain if URL does not
   * have it yet
   * @param {String} link
   * @returns {URL}
   */
  parseURL(link) {
    let href = ''
    // if start with slash, meaning domain not passed
    if (!(link || '').startsWith(`${globalThis.location.protocol}//`)) {
      href += `${globalThis.location.protocol}//${globalThis.location.hostname}`
      href += globalThis.location.port ? `:${globalThis.location.port}` : ''
      href += (link || '').startsWith('/') ? '' : '/'
    }

    return new URL(href + (link || ''))
  }

  /**
   * Process any callback before the view
   */
  async process() {
    const [, callbacks] = this.#route
    for (let fn of callbacks) {
      if (fn.prototype instanceof BaseView) continue

      await fn()
    }
  }

  /**
   * Register a route
   *
   * @param {String} pathname
   * @param {Function} callbacks
   * @param {{
   *   mapIndex?: Boolean,
   * }}
   * @throws {Error} if route already register
   */
  route(pathname) {
    if (this.#has(pathname)) {
      throw new Error(`Route pattern ${pathname} already registered.`)
    }

    // First arguments always be the path
    let args = [...arguments].slice(1)
    let opts = typeof args.at(-1) !== 'function' ? args.at(-1) : null

    // Remove last arguments if it's not a function
    // which will mean it's options
    let callbacks = opts ? args.slice(0, args.length - 1) : args

    if (!callbacks.length)
      throw new Error(`No view or callback registered for route '${pathname}'`)

    this.#routes.set(new URLPattern({ pathname }), callbacks)

    if ((opts || {}).mapIndex === true) {
      this.#routes.set(
        new URLPattern({
          pathname: `${pathname}/(index.html)?`,
        }),
        callbacks,
      )
    }
  }

  /**
   * Transition to specified route
   * @param {String} route
   * @param {HTMLElement} from
   */
  transitionTo(route, from) {
    // URL state needs to be pushed first
    // so app can know which view to load
    globalThis.history.pushState({}, '', route)

    let transitionEvt = new CustomEvent('transition', {
      bubbles: true,
    })

    from.dispatchEvent(transitionEvt)
  }

  /**
   * PRIVATE
   */

  /**
   * Get the current route pattern
   * and config
   * @returns {[Route, Array<Function>]}
   */
  get #route() {
    let current = new URL(globalThis.location.href)
    return Array.from(this.#routes.entries()).find(([pattern]) => {
      return pattern.test(current)
    })
  }

  /**
   * Check if route already registered
   * @param {String} pathname
   */
  #has(pathname) {
    return Array.from(this.#routes.keys()).some((p) => p.pathname == pathname)
  }
}

export default new Router()
