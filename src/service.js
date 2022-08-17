import { provide, Link } from '@ucanto/server'
import * as API from './type.js'
import { Execute, Deploy, Invoke } from './capability.js'

/**
 * @typedef {{
 * lambdas: Map<string, API.Code>
 * cars: Map<string, Uint8Array>
 * }} Model
 */

/**
 * @param {API.SystemServiceOptions} options
 * @returns {{system: API.SystemService}}
 */
export const service = (options) => ({
  system: {
    execute: provide(Execute, async ({ capability }) => {
      const { task } = capability.caveats
      return Link.parse('bafkqaaa')
    }),
    deploy: provide(Deploy, async ({ capability, context }) => {
      const { code } = capability.caveats
      const result = Link.parse('bafkqaaa')
      return result
    }),
    invoke: provide(Invoke, async ({ capability, context }) => {
      const { data } = capability.caveats
      return data
    }),
  },
})
