import { describe, expect, test } from 'vitest'
import { registerControl } from '.'

describe('Unit | Package', () => {
  test('can import registerControl', () => {
    expect(registerControl).toBeDefined()
  })
})
