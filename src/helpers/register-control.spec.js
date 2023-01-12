import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { registerControl } from './register-control'

/**
 * Fake class for testing
 */
class TControl extends HTMLElement {}

describe('Unit | Helpers | Register Control', () => {
  beforeEach(() => {
    this.spyDefine = vi.spyOn(globalThis.customElements, 'define')
    this.spyGet = vi.spyOn(globalThis.customElements, 'get')
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('require class to be defined', () => {
    expect(() => {
      registerControl()
    }).toThrow('`klass` is required')
  })

  test('require control to be an instance of HTMLElement', () => {
    expect(() => {
      registerControl('abc')
    }).toThrow('Control must be a descendant of HTMLElement')
  })

  test('register control base on class name', () => {
    this.spyGet.mockReturnValue(undefined)
    registerControl(TControl)
    expect(this.spyDefine).toHaveBeenLastCalledWith('control-t', TControl)
  })

  test('does not attempt to register twice', () => {
    this.spyGet.mockReturnValue(TControl)
    registerControl(TControl)
    expect(this.spyDefine).not.toHaveBeenCalled()
  })

  test('allow defining control name', () => {
    this.spyGet.mockReturnValue(undefined)
    let customName = 'custom-name'

    registerControl(TControl, customName)

    expect(this.spyDefine).toHaveBeenLastCalledWith(customName, TControl)
  })
})
