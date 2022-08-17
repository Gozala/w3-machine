import type {
  Link,
  ServiceMethod,
  SigningAuthority,
  DID,
} from '@ucanto/interface'
import type { codec as CAR } from '@ucanto/transport/car'

export type AgentDID = `did:key:${string}`
export type AccountDID = `did:key:${string}`

export type InstructionSet = CAR.Model

/**
 * Instruction that schedules transaction for execution. System will process
 * submitted transactions by executing each instruction (represented by CAR
 * roots which MUST be UCAN invocations) in order and atomically. If any
 * instruction fails effects of all previously run instructions are negated.
 */
export interface SystemExecute {
  can: 'system/execute'
  with: AccountDID
  task: Link<InstructionSet, typeof CAR.code, number, 1>
}

/**
 * Instruction to deploy a program that can be invoked using `system/invoke`
 * instruction. If account already holds another program new deploy will
 * override it with a new version.
 */

export interface SystemDeploy {
  can: 'system/deploy'
  with: AccountDID
  code: Code
}

export type Code = { type: 'rest'; url: `https:${string}` }

// Just an Account DID where foreign function is deployed
export type ForeignFunctionDID = AccountDID

/**
 * Instruction to invoke deployed program (addressed by DID of the account it was
 * deployed with) with a data represented by a specific CAR. Invoked program MAY
 * return continuation in form of another "instruction set", in which case they
 * will be executed as part of the transaction this instruction belongs to.
 */
export interface SystemInvoke {
  can: 'system/invoke'
  with: ForeignFunctionDID
  data: Link<CAR.Model, typeof CAR.code, number, 1>
}

export interface SystemService {
  execute: ServiceMethod<SystemExecute, Link, never>
  deploy: ServiceMethod<SystemDeploy, Link, never>
  invoke: ServiceMethod<SystemInvoke, Link, never>
}

export interface SystemServiceOptions {
  id: SigningAuthority
}
