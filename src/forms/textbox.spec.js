import { describe, it, expect } from 'vitest'

import { FormBaseControl, TextboxControl } from '..'

describe('Unit | Controls | TextBox', () => {
  it('is instance of FormBaseControl', () => {
    expect(new TextboxControl()).toBeInstanceOf(FormBaseControl)
  })

  it('render input', () => {
    let dataset = {
      id: 'myid',
      name: 'myid',
    }

    let control = new TextboxControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="text"]')).toHaveLength(1)

    let textbox = control.querySelector('input[type="text"]')
    expect(textbox.id).toBe(dataset.id)
    expect(textbox.name).toBe(dataset.name)
  })

  it('make field required if specified', () => {
    let control = new TextboxControl()
    control.dataset.required = 'true'

    control.connectedCallback()
    let textbox = control.querySelector('input[type="text"]')

    expect(textbox.required).toBe(true)
  })

  it('define placeholder when provided', () => {
    let dataset = {
      placeholder: 'describe action to do',
    }

    let control = new TextboxControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="text"]')).toHaveLength(1)

    let textbox = control.querySelector('input[type="text"]')
    expect(textbox.placeholder).toBe(dataset.placeholder)
  })

  it('blank placeholder if not provided', () => {
    let control = new TextboxControl()

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="text"]')).toHaveLength(1)

    let textbox = control.querySelector('input[type="text"]')
    expect(textbox.placeholder).not.toBe('undefined')
  })

  it('inherit from dataset except attribute', () => {
    let control = new TextboxControl()
    control.dataset.name = 'formname'
    control.dataset.id = 'myid'
    control.dataset.custom = 'custom'
    control.dataset.placeholder = 'custom text'

    control.connectedCallback()
    let textbox = control.querySelector('input[type="text"]')

    expect(textbox.name).toBe(control.dataset.name)
    expect(textbox.id).toBe(control.dataset.id)
    expect(textbox.placeholder).toBe(control.dataset.placeholder)

    expect(textbox.dataset.name).toBeUndefined()
    expect(textbox.dataset.id).toBeUndefined()
    expect(textbox.dataset.placeholder).toBeUndefined()
    expect(textbox.dataset.custom).toBe(control.dataset.custom)
  })
})
