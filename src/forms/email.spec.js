import { describe, test, expect } from 'vitest'

import { FormBaseControl, EmailControl } from '..'

describe('Unit | Controls | Email', () => {
  test('is instance of BaseControl', () => {
    expect(new EmailControl()).toBeInstanceOf(FormBaseControl)
  })

  test('render input email', () => {
    let dataset = {
      id: 'myid',
      name: 'myemail',
    }

    let control = new EmailControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="email"]')).toHaveLength(1)

    let emailbox = control.querySelector('input[type="email"]')
    expect(emailbox.id).toBe(dataset.id)
    expect(emailbox.name).toBe(dataset.name)
  })

  test('make field required if specified', () => {
    let control = new EmailControl()
    control.dataset.required = 'true'

    control.connectedCallback()
    let emailbox = control.querySelector('input[type="email"]')

    expect(emailbox.required).toBe(true)
  })

  test('define placeholder when provided', () => {
    let dataset = {
      placeholder: 'describe action to do',
    }

    let control = new EmailControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="email"]')).toHaveLength(1)

    let emailbox = control.querySelector('input[type="email"]')
    expect(emailbox.placeholder).toBe(dataset.placeholder)
  })

  test('blank placeholder if not provided', () => {
    let control = new EmailControl()

    control.connectedCallback()
    expect(control.querySelectorAll('input[type="email"]')).toHaveLength(1)

    let emailbox = control.querySelector('input[type="email"]')
    expect(emailbox.placeholder).not.toBe('undefined')
  })

  test('inherit from dataset except attribute', () => {
    let control = new EmailControl()
    control.dataset.name = 'formname'
    control.dataset.id = 'myid'
    control.dataset.custom = 'custom'
    control.dataset.placeholder = 'custom text'

    control.connectedCallback()
    let emailbox = control.querySelector('input[type="email"]')

    expect(emailbox.name).toBe(control.dataset.name)
    expect(emailbox.id).toBe(control.dataset.id)
    expect(emailbox.placeholder).toBe(control.dataset.placeholder)

    expect(emailbox.dataset.name).toBeUndefined()
    expect(emailbox.dataset.id).toBeUndefined()
    expect(emailbox.dataset.placeholder).toBeUndefined()
    expect(emailbox.dataset.custom).toBe(control.dataset.custom)
  })
})
