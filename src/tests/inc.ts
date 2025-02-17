import {TestCase, OP, ENTRY, STATUS, L8, L16} from './_.js'

export default [
  //
  // INC
  //
  {
    name: 'inc_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.INC_ZPG, 10],
        [10]:     [127],
      },
    },
    out: {
      mem: {
        [10]:     [128],
      },
      sr: STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'inc_zpg_x',
    in: {
      mem: {
        [ENTRY]:  [OP.INC_ZPG_X, 10],
        [10 + 2]: [127],
      },
      x: 2,
    },
    out: {
      mem: {
        [10 + 2]: [128],
      },
      sr: STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'inc_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.INC_ABS, 0x11, 0x22],
        [0x2211]: [127],
      },
    },
    out: {
      mem: {
        [0x2211]: [128],
      },
      sr: STATUS.N,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'inc_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.INC_ABS_X, 0x11, 0x22],
        [0x2211 + 2]: [127],
      },
      x: 2
    },
    out: {
      mem: {
        [0x2211 + 2]: [128],
      },
      sr: STATUS.N,
      pc: ENTRY + 3,
    },
  },
  //
  // DEC
  //
  {
    name: 'dec_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.DEC_ZPG, 10],
        [10]:     [128],
      },
    },
    out: {
      mem: {
        [10]:     [127],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'dec_zpg_x',
    in: {
      mem: {
        [ENTRY]:  [OP.DEC_ZPG_X, 10],
        [10 + 2]: [128],
      },
      x: 2,
    },
    out: {
      mem: {
        [10 + 2]: [127],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'dec_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.DEC_ABS, 0x11, 0x22],
        [0x2211]: [128],
      },
    },
    out: {
      mem: {
        [0x2211]: [127],
      },
      pc: ENTRY + 3,
    },
  },
  {
    name: 'dec_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.DEC_ABS_X, 0x11, 0x22],
        [0x2211 + 2]: [128],
      },
      x: 2
    },
    out: {
      mem: {
        [0x2211 + 2]: [127],
      },
      pc: ENTRY + 3,
    },
  },
  //
  // INX
  //
  {
    name: 'inx',
    in: {
      mem: {
        [ENTRY]:  [OP.INX],
      },
      x: 127,
    },
    out: {
      x: 128,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  //
  // INY
  //
  {
    name: 'iny',
    in: {
      mem: {
        [ENTRY]:  [OP.INY],
      },
      y: 127,
    },
    out: {
      y: 128,
      sr: STATUS.N,
      pc: ENTRY + 1,
    },
  },
  //
  // DEX
  //
  {
    name: 'dex',
    in: {
      mem: {
        [ENTRY]:  [OP.DEX],
      },
      x: 128,
    },
    out: {
      x: 127,
      pc: ENTRY + 1,
    },
  },
  //
  // DEY
  //
  {
    name: 'dey',
    in: {
      mem: {
        [ENTRY]:  [OP.DEY],
      },
      y: 128,
    },
    out: {
      y: 127,
      pc: ENTRY + 1,
    },
  },
] as TestCase[]