import { describe, expect, it } from 'vitest'
import { registerControl } from '.'

describe('Unit | Package', () => {
  it('can import registerControl', () => {
    expect(registerControl).toBeDefined()
  })
})
