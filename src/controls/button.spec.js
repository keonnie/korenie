import { describe, expect, it, vi } from 'vitest'
import { BaseControl, ButtonControl } from '..'

describe('Unit | Controls | Button', () => {
  it('is instance of base control', () => {
    expect(new ButtonControl()).toBeInstanceOf(BaseControl)
  })

  it('display its text', () => {
    let control = new ButtonControl()
    control.dataset.text = 'my button'
    control.connectedCallback()

    expect(control.textContent).toBe('my button')
  })

  describe('when clicked', () => {
    it('trigger the action', () => {
      let control = new ButtonControl()
      control.onClick = vi.fn()
      control.connectedCallback()
      control.click()

      // Ensure provide the event
      expect(control.onClick).toHaveBeenCalledWith(expect.any(Event))
    })

    it('do not trigger if not function bound', () => {
      let control = new ButtonControl()
      control.connectedCallback()
      expect(() => control.click()).not.toThrow()
    })
  })
})
