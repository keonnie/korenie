import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BaseControl } from '..'
import TeaserControl from './teaser'

describe('Unit | Controls | Teaser', () => {
  const control = new TeaserControl()

  beforeEach(() => {
    control.textContent =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu lorem quis neque porttitor mattis. Sed rutrum ligula libero, in fermentum arcu elementum et. In hac habitasse platea dictumst. Morbi feugiat placerat risus nec porttitor. Nullam ultricies orci at convallis aliquet. In aliquet ultrices justo vel blandit. Ut eu orci nisi. Aliquam suscipit nulla tellus, et sodales risus faucibus at. Nulla imperdiet enim id est rutrum consectetur.'
    control.connectedCallback()
  })

  it('is instance of BaseControl', () => {
    expect(new TeaserControl()).toBeInstanceOf(BaseControl)
  })

  it('cut off text at 50 characters by default', () => {
    const parts = control.innerHTML.split('<span')[0]
    expect(parts.length).toBe(50)
  })

  it('contains ellipsis', () => {
    expect(control.innerHTML).toEqual(
      'Lorem ipsum dolor sit amet, consectetur adipiscing<span class="ellipsis">...</span><span class="more"> elit. Suspendisse eu lorem quis neque porttitor mattis. Sed rutrum ligula libero, in fermentum arcu elementum et. In hac habitasse platea dictumst. Morbi feugiat placerat risus nec porttitor. Nullam ultricies orci at convallis aliquet. In aliquet ultrices justo vel blandit. Ut eu orci nisi. Aliquam suscipit nulla tellus, et sodales risus faucibus at. Nulla imperdiet enim id est rutrum consectetur.</span><a href="#" class="action">Read more</a>',
    )
  })

  it('toogle on anchor clicked', () => {
    const spyToogle = vi.spyOn(control, 'toogle')
    const expand = control.querySelector('a')

    expand.click()
    expect(spyToogle).toHaveBeenCalled()
  })

  it('does not toogle on control clicked', () => {
    const spyToogle = vi.spyOn(control, 'toogle')
    control.click()
    expect(spyToogle).not.toHaveBeenCalled()
  })

  it('does not redirect anchor on click', () => {
    const event = new Event('click')
    const spyEvt = vi.spyOn(event, 'preventDefault')

    const anchor = control.querySelector('a')
    anchor.dispatchEvent(event)

    expect(spyEvt).toHaveBeenCalled()
  })

  describe('when collapsed', () => {
    beforeEach(() => {
      const more = control.querySelector('.more')
      const spyMore = vi.spyOn(more, 'getClientRects')
      spyMore.mockReturnValue([])
    })

    describe('and click "Read more"', () => {
      it('change text to "Show less"', () => {
        const action = control.querySelector('.action')
        control.expand()
        expect(action.textContent).toBe('Show less')
      })

      it('show "more" content', () => {
        const more = control.querySelector('.more')
        expect(more.style.display).not.toBe('inherit')

        control.expand()
        expect(more.style.display).toBe('inherit')
      })

      it('hide ellipsis', () => {
        const ellipsis = control.querySelector('.ellipsis')
        expect(ellipsis.style.display).toBe('')

        control.expand()
        expect(ellipsis.style.display).toBe('none')
      })
    })

    it('does not call toogle on collapse', () => {
      const spyToogle = vi.spyOn(control, 'toogle')
      control.collapse()
      expect(spyToogle).not.toHaveBeenCalled()
    })
  })

  describe('when expanded', () => {
    describe('and click on "Show less"', () => {
      it('change text to "Read more"', () => {
        const action = control.querySelector('.action')
        control.collapse()
        expect(action.textContent).toBe('Read more')
      })

      it('hide "more" content', () => {
        const more = control.querySelector('.more')
        expect(more.style.display).toBe('')

        control.collapse()
        expect(more.style.display).toBe('none')
      })

      it('show ellipsis', () => {
        const ellipsis = control.querySelector('.ellipsis')
        expect(ellipsis.style.display).toBe('')

        control.collapse()
        expect(ellipsis.style.display).toBe('inherit')
      })
    })

    it('does not call toogle on expand', () => {
      const spyToogle = vi.spyOn(control, 'toogle')
      control.expand()
      expect(spyToogle).not.toHaveBeenCalled()
    })
  })
})
