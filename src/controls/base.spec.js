import { expect, describe, test } from 'vitest'
import { BaseControl } from '..'

/**
 * Sample control for testing
 * inheritence
 */
class SampleControl extends BaseControl {}

/**
 * Control with attribute for testing
 * inheritence
 */
class ControlWithAttributes extends SampleControl {
  /**
   * Constructor defining
   * dummy dataset attributes
   */
  constructor() {
    super()
    this.dataset.attribute1 = 'test1'
    this.dataset.attribute2 = 'test2'
  }
}

describe('Unit | Controls | Base', () => {
  test('is instance of HTMLElement', () => {
    expect(new BaseControl()).toBeInstanceOf(HTMLElement)
  })

  test('has tagName dasherized base on class name', () => {
    expect(BaseControl.tagName).toBe('CONTROL-BASE')
    expect(new BaseControl().tagName).toBe('CONTROL-BASE')
  })

  test('has blank body when no view defined', () => {
    let control = new BaseControl()
    control.connectedCallback()
    expect(control.innerHTML).toBe('')
  })

  test('display the view content without variable', () => {
    let control = new SampleControl()
    control._view = '<div>hello</div>'
    control.connectedCallback()
    expect(control.innerHTML).toBe('<div>hello</div>')
  })

  test('parse templates variable', () => {
    let control = new ControlWithAttributes()
    control._view = '<div>hello ${attribute1} ${attribute2}</div>'
    control.connectedCallback()
    expect(control.innerHTML).toBe('<div>hello test1 test2</div>')
  })
})
