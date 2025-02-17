import {TestCase, OP, ENTRY} from './_.js'

export default [
  {
    name: 'bus read',
    in: {
      mem: {
        [ENTRY]: [OP.LDA_ZPG, 254],
      },
    },
    out: {
      a: 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bus write',
    in: {
      mem: {
        [ENTRY]: [OP.STA_ZPG, 254],
      },
      a: 200,
    },
    out: {
      mem: {
        [10]: [200],
      },
      pc: ENTRY + 2,
    },
  },
] as TestCase[]