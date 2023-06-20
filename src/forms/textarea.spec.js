import { describe, expect, it } from 'vitest'

import { FormBaseControl, TextareaControl } from '..'

describe('Unit | Controls | Textarea', () => {
  it('is instance of FormBaseControl', () => {
    expect(new TextareaControl()).toBeInstanceOf(FormBaseControl)
  })

  it('render textarea', () => {
    let dataset = {
      id: 'myid',
      name: 'myid',
    }

    let control = new TextareaControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('textarea')).toHaveLength(1)

    let textarea = control.querySelector('textarea')
    expect(textarea.id).toBe(dataset.id)
    expect(textarea.name).toBe(dataset.name)
  })

  it('define placeholder when provided', () => {
    let dataset = {
      placeholder: 'describe action to do',
    }

    let control = new TextareaControl()
    Object.assign(control.dataset, dataset)

    control.connectedCallback()
    expect(control.querySelectorAll('textarea')).toHaveLength(1)

    let textarea = control.querySelector('textarea')
    expect(textarea.placeholder).toBe(dataset.placeholder)
  })

  it('blank placeholder if not provided', () => {
    let control = new TextareaControl()

    control.connectedCallback()
    expect(control.querySelectorAll('textarea')).toHaveLength(1)

    let textarea = control.querySelector('textarea')
    expect(textarea.placeholder).not.toBe('undefined')
  })

  it('inherit from dataset except attribute', () => {
    let control = new TextareaControl()
    control.dataset.name = 'formname'
    control.dataset.id = 'myid'
    control.dataset.custom = 'custom'
    control.dataset.placeholder = 'custom text'

    control.connectedCallback()
    let textarea = control.querySelector('textarea')

    expect(textarea.name).toBe(control.dataset.name)
    expect(textarea.id).toBe(control.dataset.id)
    expect(textarea.placeholder).toBe(control.dataset.placeholder)

    expect(textarea.dataset.name).toBeUndefined()
    expect(textarea.dataset.id).toBeUndefined()
    expect(textarea.dataset.placeholder).toBeUndefined()
    expect(textarea.dataset.custom).toBe(control.dataset.custom)
  })

  describe('when text input', () => {
    it('resize height', () => {
      let control = new TextareaControl()
      control.dataset.name = 'formname'
      control.dataset.id = 'myid'

      control.connectedCallback()

      let textarea = control.querySelector('textarea')
      control.scrollHeight = 30

      let evt = new Event('input', {
        target: textarea,
      })

      control.dispatchEvent(evt)
      expect(control.style.height).toBe(`${control.scrollHeight}px`)
    })
  })
})
