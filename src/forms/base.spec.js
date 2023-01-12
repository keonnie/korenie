import { describe, expect, test, vi } from 'vitest'

import { BaseControl } from '..'
import { FormBaseControl } from '.'

describe('Unit | Controls | Forms | Base', () => {
  test('track property change for onPopulate', () => {
    expect(FormBaseControl.observedAttributes).toContain('onPopulate')
  })

  test('is an instance of BaseControl', () => {
    expect(new FormBaseControl()).toBeInstanceOf(BaseControl)
  })

  test('include base control class name', () => {
    let control = new FormBaseControl()
    control.connectedCallback()
    expect(control.className).toContain('dw-form-controls')
  })

  test('display label', () => {
    let control = new FormBaseControl()
    control.dataset.label = 'My label'

    control.connectedCallback()

    expect(control.querySelectorAll('label')).toHaveLength(1)
    expect(control.querySelector('label').textContent).toBe('My label')
  })

  test('omit label if not provided', () => {
    let control = new FormBaseControl()

    control.connectedCallback()

    expect(control.querySelector('label')).toBe(null)
  })

  test('define the attribute `for`', () => {
    let control = new FormBaseControl()
    control.dataset.label = 'My label'

    control.connectedCallback()

    expect(control.querySelector('label').htmlFor).not.toBeUndefined()
  })

  test('use dataset name if id not provided', () => {
    let dataset = { name: 'el-name' }
    let control = new FormBaseControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()

    expect(control.dataset.id).toBe(dataset.name)
  })

  test('use dataset id if name not provided', () => {
    let dataset = { id: 'el-id' }
    let control = new FormBaseControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()

    expect(control.dataset.name).toBe(dataset.id)
  })

  test('generate id if no dataset name and id provided', () => {
    let control = new FormBaseControl()
    control.connectedCallback()
    expect(control.dataset.id).not.toBeUndefined()
    expect(control.dataset.name).toBe(control.dataset.id)
  })

  test('prefix id with dw if start with number', () => {
    let control = new FormBaseControl()
    control.dataset.id = '123'
    control.connectedCallback()
    expect(control.dataset.id).toBe('dw123')
  })

  test('render description', () => {
    let description = 'This is field description'
    let control = new FormBaseControl()
    control.dataset.description = description

    control.connectedCallback()

    expect(control.querySelectorAll('p')).toHaveLength(1)
    expect(control.querySelector('p').textContent).toBe(description)
  })

  test('does not call _populated if no callback set', () => {
    let control = new FormBaseControl()
    let spyPopulated = vi.spyOn(control, '_populated')
    control.populate()

    expect(spyPopulated).not.toHaveBeenCalled()
  })

  describe('when run reportValidity', () => {
    test('call all child validity', () => {
      let control = new FormBaseControl()
      control.append('<input type="text" name="test" required>')

      expect(control.childElementCount).toBe(1)
      let input = control.children[0]
      let spyValidator = vi.spyOn(input, 'reportValidity')

      control.reportValidity()

      expect(spyValidator).toHaveBeenCalled()
    })

    test('return valid if child element does not support validity', () => {
      let control = new FormBaseControl()
      control.append('<span></span>')

      expect(control.childElementCount).toBe(1)

      let element = control.children[0]
      expect(element.reportValidity).toBeUndefined()

      control.reportValidity()

      expect(control.reportValidity()).toBeTruthy()
    })

    test('return false if any of children fail validation', () => {
      let control = new FormBaseControl()
      control.append(`
        <input type="text" name="test" required>
        <input type="text" name="test2">
      `)

      expect(control.childElementCount).toBe(2)

      let input1 = control.children[0]
      let input2 = control.children[1]
      let spyValidator1 = vi.spyOn(input1, 'reportValidity')
      let spyValidator2 = vi.spyOn(input2, 'reportValidity')

      spyValidator1.mockReturnValue(false)
      spyValidator2.mockReturnValue(true)

      control.reportValidity()

      expect(control.reportValidity()).toBe(false)
    })

    test('return true if all children pass validation', () => {
      let control = new FormBaseControl()
      control.append(`
        <input type="text" name="test">
        <input type="text" name="test2">
      `)

      expect(control.childElementCount).toBe(2)

      let input1 = control.children[0]
      let input2 = control.children[1]
      let spyValidator1 = vi.spyOn(input1, 'reportValidity')
      let spyValidator2 = vi.spyOn(input2, 'reportValidity')

      spyValidator1.mockReturnValue(true)
      spyValidator2.mockReturnValue(true)

      control.reportValidity()

      expect(control.reportValidity()).toBe(true)
    })
  })
})
