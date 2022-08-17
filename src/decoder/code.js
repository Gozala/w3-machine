import * as API from '@ucanto/interface'
import { Failure, URI } from '@ucanto/validator'

/**
 * @typedef {{
 * type: 'rest'
 * url: `https:${string}`
 * }} RestEndpoint
 */

/**
 *
 * @param {unknown} input
 * @returns {API.Result<RestEndpoint, API.Failure>}
 */
export const decode = (input) => {
  if (
    input == null ||
    typeof input !== 'object' ||
    /** @type {{type:unknown}} */ (input).type !== 'rest'
  ) {
    return new Failure(
      `Expected a structure like {type:'rest', url:string} instead got ${JSON.stringify(
        input
      )}`
    )
  }
  const result = URI.decode(/** @type {{url:string}} */ (input).url, {
    protocol: 'https:',
  })

  if (result.error) {
    return result
  } else {
    return { type: 'rest', url: result.href }
  }
}
