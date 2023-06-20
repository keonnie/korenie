import { describe, expect, it, vi } from 'vitest'

import { FormBaseControl, CheckboxListControl } from '..'

describe('Unit | Controls | Forms | CheckboxList', () => {
  it('is instance of FormControls', () => {
    expect(new CheckboxListControl()).toBeInstanceOf(FormBaseControl)
  })

  it('skip if not data bound', () => {
    let list = new CheckboxListControl()
    list.onPopulate = vi.fn().mockReturnValue(null)

    expect(() => list.connectedCallback()).not.toThrow(TypeError)
  })

  it('populate checkboxes', () => {
    let checkboxes = [
      {
        label: 'testlabel1',
        value: 'testvalue1',
      },
      {
        label: 'testlabel1',
        value: 'testvalue1',
      },
    ]

    let list = new CheckboxListControl()
    list.onPopulate = vi.fn().mockReturnValue(checkboxes)

    list.connectedCallback()

    let checkbox_elements = list.querySelectorAll('control-checkbox')
    expect(checkbox_elements).toHaveLength(2)

    let first = checkbox_elements[0]
    expect(first.dataset.label).toBe(checkboxes[0].label)
    expect(first.dataset.value).toBe(checkboxes[0].value)
  })
})
