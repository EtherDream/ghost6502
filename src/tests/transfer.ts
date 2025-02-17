import {TestCase, OP, ENTRY, STATUS} from './_.js'

export default [
  {
    name: 'tax',
    in: {
      mem: {
        [ENTRY]: [OP.TAX],
      },
      a: 128,
    },
    out: {
      x: 128,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'tay',
    in: {
      mem: {
        [ENTRY]: [OP.TAY],
      },
      a: 128,
    },
    out: {
      y: 128,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'txa',
    in: {
      mem: {
        [ENTRY]: [OP.TXA],
      },
      x: 128,
    },
    out: {
      a: 128,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'tya',
    in: {
      mem: {
        [ENTRY]: [OP.TYA],
      },
      y: 128,
    },
    out: {
      a: 128,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'tsx',
    in: {
      mem: {
        [ENTRY]: [OP.TSX],
      },
      sp: 255,
    },
    out: {
      x: 255,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'txs',
    in: {
      mem: {
        [ENTRY]: [OP.TXS],
      },
      x: 255,
    },
    out: {
      sp: 255,
      pc: ENTRY + 1,
    },
  },
] as TestCase[]