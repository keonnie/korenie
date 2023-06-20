import { describe, expect, it } from 'vitest'
import { FormBaseControl, CheckboxControl } from '..'

describe('Unit | Controls | Forms | Checkbox', () => {
  it('is instance of FormControl', () => {
    expect(new CheckboxControl()).toBeInstanceOf(FormBaseControl)
  })

  it('display checkbox with label', () => {
    let control = new CheckboxControl()
    control.dataset.label = 'label'
    control.dataset.value = 'value'
    control.connectedCallback()

    expect(control.querySelectorAll('input[type="checkbox"')).toHaveLength(1)

    let label = control.querySelector('label')
    expect(label).not.toBeNull()
    expect(label.textContent).toBe(control.dataset.label)

    let checkbox = control.querySelector('input[type="checkbox"]')
    expect(checkbox).not.toBeNull()
    expect(checkbox.value).toBe(control.dataset.value)
  })

  it('tied label to checkbox when id defined', () => {
    let control = new CheckboxControl()
    control.id = 'mychx'
    control.dataset.label = 'label'
    control.dataset.value = 'value'
    control.connectedCallback()

    let checkbox = control.querySelector('input[type="checkbox"]')
    expect(checkbox.id).toBe('chx-mychx')

    let label = control.querySelector('label')
    expect(label.htmlFor).toBe('chx-mychx')
  })

  it('tied label to checkbox when id not defined', () => {
    let control = new CheckboxControl()
    control.dataset.label = 'label'
    control.dataset.value = 'value'
    control.connectedCallback()

    let checkbox = control.querySelector('input[type="checkbox"]')
    expect(checkbox.id).not.toBeUndefined()

    let label = control.querySelector('label')
    expect(label.htmlFor).toBe(checkbox.id)
  })

  it('prevent label display if dataset label not defined', () => {
    let control = new CheckboxControl()
    control.dataset.value = 'value'
    control.connectedCallback()

    expect(control.querySelectorAll('label')).toHaveLength(0)
  })
})
