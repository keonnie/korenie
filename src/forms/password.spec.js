import { describe, it, expect } from 'vitest'

import { FormBaseControl, PasswordControl } from '..'

describe('Unit | Controls | Password', () => {
  it('is instance of BaseControl', () => {
    expect(new PasswordControl()).toBeInstanceOf(FormBaseControl)
  })

  it('render input password', () => {
    let dataset = {
      id: 'myid',
      name: 'myemail',
    }

    let control = new PasswordControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="password"]')).toHaveLength(1)

    let passwordbox = control.querySelector('input[type="password"]')
    expect(passwordbox.id).toBe(dataset.id)
    expect(passwordbox.name).toBe(dataset.name)
  })

  it('make field required if specified', () => {
    let control = new PasswordControl()
    control.dataset.required = 'true'

    control.connectedCallback()
    let passwordbox = control.querySelector('input[type="password"]')

    expect(passwordbox.required).toBe(true)
  })

  it('define placeholder when provided', () => {
    let dataset = {
      placeholder: 'describe action to do',
    }

    let control = new PasswordControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="password"]')).toHaveLength(1)

    let passwordbox = control.querySelector('input[type="password"]')
    expect(passwordbox.placeholder).toBe(dataset.placeholder)
  })

  it('blank placeholder if not provided', () => {
    let control = new PasswordControl()

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="password"]')).toHaveLength(1)

    let passwordbox = control.querySelector('input[type="password"]')
    expect(passwordbox.placeholder).not.toBe('undefined')
  })

  it('inherit from dataset except attribute', () => {
    let control = new PasswordControl()
    control.dataset.name = 'formname'
    control.dataset.id = 'myid'
    control.dataset.custom = 'custom'
    control.dataset.placeholder = 'custom text'

    control.connectedCallback()
    let passwordbox = control.querySelector('input[type="password"]')

    expect(passwordbox.name).toBe(control.dataset.name)
    expect(passwordbox.id).toBe(control.dataset.id)
    expect(passwordbox.placeholder).toBe(control.dataset.placeholder)

    expect(passwordbox.dataset.name).toBeUndefined()
    expect(passwordbox.dataset.id).toBeUndefined()
    expect(passwordbox.dataset.placeholder).toBeUndefined()
    expect(passwordbox.dataset.custom).toBe(control.dataset.custom)
  })

  it('auto-complete always off', () => {
    let control = new PasswordControl()
    control.connectedCallback()
    let passwordfield = control.querySelector('input[type="password"]')
    expect(passwordfield.autocomplete).toBe('off')
  })
})
