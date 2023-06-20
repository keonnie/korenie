import { expect, describe, it, beforeAll, vi, beforeEach } from 'vitest'
import { LinkTo } from '..'

describe('Unit | Controls | LinkTo', () => {
  beforeAll(() => {
    // Define the domain of the app
    globalThis.location.href = 'http://myapp.com'
  })

  it('instance of HTMLElement', () => {
    let control = new LinkTo()
    expect(control).toBeInstanceOf(HTMLElement)
  })

  it('raise error if not routing to application', () => {
    let anchor = new LinkTo()
    anchor.setAttribute('route', 'http://notadomain.com')

    expect(() => anchor.connectedCallback()).toThrowError(
      'LinkTo should only be used for routing in the application. Use normal anchor for anything else.',
    )
  })

  it('does not bind click if route undefined', () => {
    let anchor = new LinkTo()
    let spyListener = vi.spyOn(anchor, 'addEventListener')

    anchor.connectedCallback()
    expect(spyListener).not.toHaveBeenCalledWith('click', expect.any(Function))
  })

  it('not binding click if route blank', () => {
    let anchor = new LinkTo()
    anchor.setAttribute('route', '')
    let spyListener = vi.spyOn(anchor, 'addEventListener')

    anchor.connectedCallback()
    expect(spyListener).not.toHaveBeenCalledWith('click', expect.any(Function))
  })

  describe('when click', () => {
    beforeEach(() => {
      this.anchor = new LinkTo()
      this.anchor.setAttribute('route', '/about')
    })

    it('add the URL to history', () => {
      const spy = vi.spyOn(globalThis.history, 'pushState')
      let new_url = globalThis.location.href + 'about'

      this.anchor.connectedCallback()
      this.anchor.click()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toBeCalledWith({}, '', new_url)
    })

    it('notify listeners', () => {
      const evtSpy = vi.spyOn(this.anchor, 'dispatchEvent')
      this.anchor.connectedCallback()
      this.anchor.click()

      expect(evtSpy).toHaveBeenLastCalledWith(expect.any(CustomEvent))
    })
  })
})
