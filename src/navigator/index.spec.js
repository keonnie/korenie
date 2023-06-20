import { afterEach, describe, expect, it, vi } from 'vitest'

describe('Unit | Navigator', () => {
  let spyListener = vi.spyOn(globalThis, 'addEventListener')

  afterEach(() => {
    spyListener.mockClear()
    vi.resetAllMocks()
    vi.resetModules()
  })

  it('register event listener for back', async () => {
    const Navigation = await import('./navigation')
    await import('.')

    expect(spyListener).toHaveBeenCalledWith('popstate', Navigation.back)
  })

  it('register event listener for setting title', async () => {
    const Navigation = await import('./navigation')
    await import('.')

    expect(spyListener).toHaveBeenNthCalledWith(
      2,
      'DOMContentLoaded',
      Navigation.title,
    )
  })
})
