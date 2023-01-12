import { describe, expect, test } from 'vitest'
import { parseLiterals } from '.'

describe('Unit | Helpers | Parser', () => {
  test('return normal string if blank object', () => {
    let content = parseLiterals('text')
    expect(content).toBe('text')
  })

  test('return parse content based on object', () => {
    let content = parseLiterals('Hello ${username}', {
      username: 'Frank',
    })
    expect(content).toBe('Hello Frank')
  })

  test('return blank string if param not defined', () => {
    let content = parseLiterals('Hello ${username}')
    expect(content).toBe('Hello ')
  })
})
