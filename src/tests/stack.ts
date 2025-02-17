import {TestCase, OP, STACK, ENTRY, STATUS, H8, L8} from './_.js'

export default [
  {
    name: 'pha',
    in: {
      mem: {
        [ENTRY]: [OP.PHA],
      },
      a: 123,
    },
    out: {
      mem: {
        [STACK]: [123],
      },
      sp: 0xFF - 1,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'pla',
    in: {
      mem: {
        [ENTRY]:  [OP.PLA],
        [STACK]:  [128],
      },
      sp: 0xFF - 1,
    },
    out: {
      a: 128,
      sp: 0xFF,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'php',
    in: {
      mem: {
        [ENTRY]: [OP.PHP],
      },
      sr: 0,
    },
    out: {
      mem: {
        [STACK]: [STATUS.B | STATUS._],
      },
      sp: 0xFF - 1,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'plp',
    in: {
      mem: {
        [ENTRY]:      [OP.PLP],
        [STACK - 1]:  [STATUS.N | STATUS._ | STATUS.B],
      },
      sp: 0xFF - 1,
    },
    out: {
      sr: STATUS.N,
      sp: 0xFF,
      pc: ENTRY + 1,
    },
  },
  //
  // call and return
  //
  {
    name: 'jsr',
    in: {
      mem: {
        [ENTRY]: [OP.JSR, 0x11, 0x22],
      },
    },
    out: {
      mem: {
        [STACK - 1]: [H8(ENTRY + 3), L8(ENTRY + 3)],
      },
      pc: 0x2211,
      sp: 0xFF - 2,
    },
  },
  {
    name: 'rts',
    in: {
      mem: {
        [ENTRY]:      [OP.RTS],
        [STACK - 1]:  [0x11, 0x22],
      },
      sp: 0xFF - 2,
    },
    out: {
      pc: 0x1122,
      sp: 0xFF,
    },
  },
  {
    name: 'rti',
    in: {
      mem: {
        [ENTRY]:      [OP.RTI],
        [STACK - 2]:  [0xFF, 0x22, 0x11],
      },
      sp: 0xFF - 3,
    },
    out: {
      sr: 0xFF,
      pc: 0x1122,
      sp: 0xFF,
    },
  },
] as TestCase[]