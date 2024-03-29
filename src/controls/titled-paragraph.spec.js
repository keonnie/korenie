import { describe, expect, it } from 'vitest'
import { BaseControl } from '..'
import TitledParagraphControl from './titled-paragraph'

describe('Unit | Controls | Title Paragraph', () => {
  it('is instance of BaseControl', () => {
    expect(new TitledParagraphControl()).toBeInstanceOf(BaseControl)
  })

  it('display title and paragraph', () => {
    let control = new TitledParagraphControl()
    control.dataset.header = 'First header'
    control.dataset.value = 'My long paragraph'
    control.dataset.name = 'catfinder'

    control.connectedCallback()

    expect(control.querySelector('h3').textContent).toBe(control.dataset.header)

    expect(control.querySelector('p').textContent).toBe(control.dataset.value)
  })
})
