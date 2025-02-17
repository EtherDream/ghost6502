import {TestCase, OP, STATUS, ENTRY} from './_.js'

export default [
  {
    name: 'sr_n set',
    in: {
      mem: {
        [ENTRY]: [OP.LDA_IMM, 0x80],
      },
    },
    out: {
      a: 0x80,
      sr: STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sr_n clear',
    in: {
      mem: {
        [ENTRY]: [OP.LDA_IMM, 0x7F],
      },
      sr: STATUS.N,
    },
    out: {
      a: 0x7F,
      sr: 0,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sr_z set',
    in: {
      mem: {
        [ENTRY]: [OP.LDA_IMM, 0],
      },
    },
    out: {
      a: 0,
      sr: STATUS.Z,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sr_z clear',
    in: {
      mem: {
        [ENTRY]: [OP.LDA_IMM, 1],
      },
      sr: STATUS.Z,
    },
    out: {
      a: 1,
      sr: 0,
      pc: ENTRY + 2,
    },
  },
  //
  // cl*
  //
  {
    name: 'clc',
    in: {
      mem: {
        [ENTRY]: [OP.CLC],
      },
      sr: 0xFF,
    },
    out: {
      pc: ENTRY + 1,
      sr: 0xFF & ~STATUS.C,
    },
  },
  {
    name: 'cld',
    in: {
      mem: {
        [ENTRY]: [OP.CLD],
      },
      sr: 0xFF
    },
    out: {
      pc: ENTRY + 1,
      sr: 0xFF & ~STATUS.D,
    },
  },
  {
    name: 'cli',
    in: {
      mem: {
        [ENTRY]: [OP.CLI],
      },
      sr: 0xFF,
    },
    out: {
      pc: ENTRY + 1,
      sr: 0xFF & ~STATUS.I,
    },
  },
  {
    name: 'clv',
    in: {
      mem: {
        [ENTRY]: [OP.CLV],
      },
      sr: 0xFF
    },
    out: {
      pc: ENTRY + 1,
      sr: 0xFF & ~STATUS.V,
    },
  },
  //
  // se*
  //
  {
    name: 'sec',
    in: {
      mem: {
        [ENTRY]: [OP.SEC],
      },
      sr: 0xFF & ~STATUS.C,
    },
    out: {
      pc: ENTRY + 1,
      sr: 0xFF,
    },
  },
  {
    name: 'sed',
    in: {
      mem: {
        [ENTRY]: [OP.SED],
      },
      sr: 0xFF & ~STATUS.D,
    },
    out: {
      pc: ENTRY + 1,
      sr: 0xFF,
    },
  },
  {
    name: 'sei',
    in: {
      mem: {
        [ENTRY]: [OP.SEI],
      },
      sr: 0xFF & ~STATUS.I,
    },
    out: {
      pc: ENTRY + 1,
      sr: 0xFF,
    },
  },
] as TestCase[]