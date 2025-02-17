import {TestCase, OP, ENTRY} from './_.js'

export default [
  //
  // STA
  //
  {
    name: 'sta_zpg',
    in: {
      mem: {
        [ENTRY]: [OP.STA_ZPG, 3],
      },
      a: 123,
    },
    out: {
      mem: {
        [3]: [123],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sta_zpg_x',
    in: {
      mem: {
        [ENTRY]: [OP.STA_ZPG_X, 3],
      },
      a: 123,
      x: 5,
    },
    out: {
      mem: {
        [3 + 5]: [123],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sta_abs',
    in: {
      mem: {
        [ENTRY]: [OP.STA_ABS, 0x11, 0x22],
      },
      a: 123,
    },
    out: {
      mem: {
        [0x2211]: [123],
      },
      pc: ENTRY + 3,
    },
  },
  {
    name: 'sta_abs_x',
    in: {
      mem: {
        [ENTRY]: [OP.STA_ABS_X, 0x11, 0x22],
      },
      x: 5,
      a: 123,
    },
    out: {
      mem: {
        [0x2211 + 5]: [123],
      },
      pc: ENTRY + 3,
    },
  },
  {
    name: 'sta_abs_y',
    in: {
      mem: {
        [ENTRY]: [OP.STA_ABS_Y, 0x11, 0x22],
      },
      y: 5,
      a: 123,
    },
    out: {
      mem: {
        [0x2211 + 5]: [123],
      },
      pc: ENTRY + 3,
    },
  },
  {
    name: 'sta_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.STA_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
      },
      x: 20,
      a: 5,
    },
    out: {
      mem: {
        [0x2211]:   [5],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sta_ind_y',
    in: {
      mem: {
        [ENTRY]:  [OP.STA_IND_Y, 200],
        [200]:    [0x11, 0x22],
      },
      y: 1,
      a: 5,
    },
    out: {
      mem: {
        [0x2211 + 1]: [5],
      },
      pc: ENTRY + 2,
    },
  },
  //
  // STX
  //
  {
    name: 'stx_zpg',
    in: {
      mem: {
        [ENTRY]: [OP.STX_ZPG, 3],
      },
      x: 123,
    },
    out: {
      mem: {
        [3]: [123],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'stx_zpg_y',
    in: {
      mem: {
        [ENTRY]: [OP.STX_ZPG_Y, 3],
      },
      x: 123,
      y: 5,
    },
    out: {
      mem: {
        [3 + 5]: [123],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'stx_abs',
    in: {
      mem: {
        [ENTRY]: [OP.STX_ABS, 0x11, 0x22],
      },
      x: 123,
    },
    out: {
      mem: {
        [0x2211]: [123],
      },
      pc: ENTRY + 3,
    },
  },
  //
  // STY
  //
  {
    name: 'sty_zpg',
    in: {
      mem: {
        [ENTRY]: [OP.STY_ZPG, 3],
      },
      y: 123,
    },
    out: {
      mem: {
        [3]: [123],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sty_zpg_x',
    in: {
      mem: {
        [ENTRY]: [OP.STY_ZPG_X, 3],
      },
      y: 123,
      x: 5,
    },
    out: {
      mem: {
        [3 + 5]: [123],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sty_abs',
    in: {
      mem: {
        [ENTRY]: [OP.STY_ABS, 0x11, 0x22],
      },
      y: 123,
    },
    out: {
      mem: {
        [0x2211]: [123],
      },
      pc: ENTRY + 3,
    },
  },
] as TestCase[]