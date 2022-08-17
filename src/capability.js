import { capability, URI, Link } from '@ucanto/validator'
import * as RestEndpoint from './decoder/code.js'
export const AccountDID = URI.match({ protocol: 'did:' })
export const ForeignFunctionDID = AccountDID
export const CARLink = Link.match({
  code: 0x0202,
  version: 1,
})

export const Execute = capability({
  can: 'system/execute',
  with: AccountDID,
  caveats: {
    task: CARLink,
  },
})

export const Deploy = capability({
  can: 'system/deploy',
  with: URI.match({ protocol: 'did:' }),
  caveats: {
    code: RestEndpoint,
  },
})

export const Invoke = capability({
  can: 'system/invoke',
  with: ForeignFunctionDID,
  caveats: {
    data: CARLink,
  },
})
