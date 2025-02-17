import {TestCase, OP, STACK, ENTRY, STATUS, H8, L8} from './_.js'

export default [
  {
    name: 'nop',
    in: {
      mem: {
        [ENTRY]: [OP.NOP],
      },
    },
    out: {
      pc: ENTRY + 1,
    },
  },
] as TestCase[]