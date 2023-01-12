import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import { BaseView, Router } from '.'

class ProductView extends BaseView {}

describe('Unit | Router', () => {
  afterEach(() => {
    '/core'
    vi.resetModules()
  })

  test('return URL type', () => {
    let url = Router.parseURL('/about')
    expect(url).toBeInstanceOf(URL)
  })

  describe('> parseURL', () => {
    test('append the domain if not exist', () => {
      globalThis.location.href = 'http://mydomain.com'
      let url = Router.parseURL('/about')
      expect(url.protocol).toBe('http:')
      expect(url.host).toBe('mydomain.com')
      expect(url.href).toBe('http://mydomain.com/about')
    })

    test('do not change URL if domain provided', () => {
      let url = Router.parseURL('http://mydomain.com/help')
      expect(url.protocol).toBe('http:')
      expect(url.host).toBe('mydomain.com')
      expect(url.href).toBe('http://mydomain.com/help')
    })

    test('return home domain URL if nothing provided', () => {
      let url = Router.parseURL()
      expect(url.protocol).toBe('http:')
      expect(url.host).toBe('mydomain.com')
      expect(url.href).toBe('http://mydomain.com/')
    })

    test('parse the port number if provided', () => {
      globalThis.location.href = 'http://mydomain.com:5173'
      let url = Router.parseURL('/about')
      expect(url.href).toBe('http://mydomain.com:5173/about')
    })
  })

  describe('> route', () => {
    test('register route without any params', () => {
      Router.route('/about', function AboutViewer() {})
      expect(Router.routes.size).toBeGreaterThan(0)
    })

    test('register route with params', () => {
      Router.route('/test/:id/new', function TestView() {})
      expect(Router.routes.size).toBeGreaterThan(0)
    })

    test('cannot register the same route', () => {
      let route = '/exist/:id/new'
      Router.route(route, function TestView() {})
      expect(() => {
        Router.route(route, function OtherView() {})
      }).toThrowError(`Route pattern ${route} already registered.`)
    })

    test('register with mapIndex', () => {
      let mainPath = '/indexed'
      let pathname = `${mainPath}/index.html`
      Router.route(mainPath, function TestView() {}, { mapIndex: true })

      const r = Array.from(Router.routes.entries()).find(([pattern]) => {
        return pattern.test({ pathname })
      })

      expect(r).toBeDefined()
    })

    test('throw error if no view or callback registered', () => {
      let pathname = '/test'
      expect(() => Router.route(pathname, {})).toThrow(
        `No view or callback registered for route '${pathname}'`,
      )
    })
  })

  describe('> viewer', () => {
    beforeAll(() => {
      Router.route('/products', ProductView)
      Router.route('/products/:type/new', ProductView)
    })

    beforeEach(async () => {
      vi.mock('./helpers', () => {
        return {
          registerControl: vi.fn(),
        }
      })

      const { registerControl } = await import('./helpers')
      this.mockRegisterControl = registerControl
    })

    afterEach(() => {
      vi.resetAllMocks()
    })

    test('get current view tag without any attributes', () => {
      globalThis.location.href = 'http://test.com/products'
      expect(Router.viewer.tag).toBe('<view-product></view-product>')
    })

    test('get the current custom view tag', () => {
      globalThis.location.href = 'http://test.com/products/test/new'
      expect(Router.viewer.tag).toBe(
        '<view-product data-type="test"></view-product>',
      )
    })

    test('register custom tag', () => {
      Router.viewer.tag
      expect(this.mockRegisterControl).toHaveBeenCalledTimes(1)
    })

    test('get route with index.html', () => {
      globalThis.location.href = 'http://test.com/imagine/index.html'
      Router.route('/imagine', ProductView, { mapIndex: true })
      expect(() => Router.viewer).not.toThrow()
    })
  })

  describe('> process', () => {
    test('callbacks in orders', async () => {
      globalThis.location.href = 'http://test.com/authpage'
      let callback = vi.fn()
      Router.route('/authpage', callback, ProductView)
      await Router.process()
      expect(callback).toHaveBeenCalled()
    })
  })

  describe('> transitionTo', () => {
    beforeEach(() => {
      this.element = { dispatchEvent: vi.fn() }
    })

    afterEach(() => {
      vi.resetAllMocks()
    })

    test('dispatch transition event from element', () => {
      Router.transitionTo('/about', this.element)

      expect(this.element.dispatchEvent).toHaveBeenCalledWith(
        expect.any(CustomEvent),
      )
    })

    test('add to the url', async () => {
      const spy = vi.spyOn(globalThis.history, 'pushState')
      let new_url = globalThis.location.href + 'about'

      Router.transitionTo(new_url, this.element)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toBeCalledWith({}, '', new_url)
    })
  })
})
