import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  mockEvent,
  __mockDispatchEvent,
  __mockQuerySelector,
} from '../../__mocks__/event'
import Navigation from './navigation'

describe('Unit | Navigator | Navigation', () => {
  afterEach(() => {
    __mockDispatchEvent.mockClear()
    __mockQuerySelector.mockClear()
  })

  describe('when back click', () => {
    test('dispatch event transition', () => {
      Navigation.back(mockEvent)

      expect(__mockDispatchEvent).toHaveBeenCalled(expect.any(CustomEvent))
    })

    test('fallback to global document if no owner doc', () => {
      let spyQuerySelector = vi.spyOn(globalThis.document, 'querySelector')
      spyQuerySelector.mockImplementation(() => {
        return { dispatchEvent: __mockDispatchEvent }
      })
      let mockEvt = { target: {} }

      Navigation.back(mockEvt)

      expect(spyQuerySelector).toHaveBeenCalled()
    })
  })

  describe('> tab title', () => {
    test('define it', () => {
      let titleEl = {
        textContent: '',
      }
      let appEl = { dataset: { apptitle: 'company name' } }
      mockEvent.target.ownerDocument.querySelector.mockReturnValueOnce(titleEl)
      mockEvent.target.ownerDocument.querySelector.mockReturnValueOnce(appEl)
      Navigation.title(mockEvent)

      expect(titleEl.textContent).toBe(appEl.dataset.apptitle)
    })

    test('fallback to global document if no owner doc', () => {
      let spyQuerySelector = vi.spyOn(globalThis.document, 'querySelector')
      spyQuerySelector.mockImplementation(() => {
        return { dispatchEvent: __mockDispatchEvent }
      })
      let mockEvt = { target: {} }

      Navigation.title(mockEvt)

      expect(spyQuerySelector).toHaveBeenCalled()
    })
  })
})
