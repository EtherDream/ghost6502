import OP from '../opcode.js'
import {STATUS} from '../ghost6502.js'

export const STACK = 0x01FF
export const ENTRY = 0x0600
export {OP, STATUS}

export const H8 = (v: number) => v >> 8
export const L8 = (v: number) => v & 0xFF
export const L16 = (v: number) => v & 0xFFFF


export type MemRange = {
  [key: number]: number[]
}

interface CtxOpt {
  mem?: MemRange
  pc?: number
  a?: number
  x?: number
  y?: number
  sr?: number
  sp?: number
}

interface InCtxOpt extends CtxOpt {
  mem: MemRange
}

export type TestCase = {
  name: string
  in: InCtxOpt
  out: CtxOpt
  loop?: number
  methods?: ('reset' | 'irq' | 'nmi' | 'run')[]
}