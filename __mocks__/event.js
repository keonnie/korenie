import { vi } from 'vitest'

export const __mockQuerySelector = vi.fn()
export const __mockDispatchEvent = vi.fn()

/**
 * Mock return element from
 * query selector
 */
export const mockSelected = {
  textContent: '',
  dispatchEvent: __mockDispatchEvent,
}

/**
 * Mock event
 */
export const mockEvent = {
  target: {
    ownerDocument: {
      querySelector: __mockQuerySelector,
    },
  },
}

/**
 * Return a fake element for
 * testing
 * @return {{
 *   textContent?: String
 * }}
 */
__mockQuerySelector.mockImplementation(() => {
  return mockSelected
})
