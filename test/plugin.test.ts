import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { testPlugin } from '@hodi-app/plugin-sdk/testing'

// The plugin's server part, built and run as Hodi runs it, around a small Hodi in memory. Write your own tests the
// same way: a route asked as a person of the household, and what it answers.
describe('my-plugin', async () => {
  const hodi = await testPlugin('.')
  after(() => hodi.stop())

  it('says hello with its greeting, and counts each time', async () => {
    const first = await hodi.route('POST /hello')
    assert.deepEqual([first.status, first.body], [200, { text: 'Bonjour', count: 1 }])
    const second = await hodi.route('POST /hello')
    assert.deepEqual(second.body, { text: 'Bonjour', count: 2 })
  })

  it('answers every profile it is for, a child too', async () => {
    const child = await hodi.addPerson({ name: 'Zoé', kind: 'child' })
    assert.equal((await hodi.route('POST /hello', { as: child })).status, 200)
  })
})

describe('my-plugin, loud', async () => {
  const hodi = await testPlugin('.', { settings: { greeting: 'Salut', loud: true } })
  after(() => hodi.stop())

  it('shouts the greeting the admin chose', async () => {
    assert.deepEqual((await hodi.route('POST /hello')).body, { text: 'SALUT', count: 1 })
  })
})
