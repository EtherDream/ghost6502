import {TestCase, OP, ENTRY} from './_.js'

export default [
  //
  // ORA
  //
  {
    name: 'ora_imm',
    in: {
      mem: {
        [ENTRY]: [OP.ORA_IMM, 123],
      },
      a: 100,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ora_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.ORA_ZPG, 5],
        [5]:      [123]
      },
      a: 100,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ora_zpg_x',
    in: {
      mem: {
        [ENTRY]:  [OP.ORA_ZPG_X, 30],
        [50]:     [100],
      },
      a: 123,
      x: 20,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ora_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.ORA_ABS, 0x22, 0x11],
        [0x1122]: [100],
      },
      a: 123,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'ora_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.ORA_ABS_X, 0x22, 0x11],
        [0x1122 + 2]: [100],
      },
      a: 123,
      x: 2,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'ora_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.ORA_ABS_Y, 0x22, 0x11],
        [0x1122 + 2]: [100],
      },
      a: 123,
      y: 2,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'ora_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.ORA_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
        [0x2211]:   [100],
      },
      a: 123,
      x: 20,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ora_ind_y',
    in: {
      mem: {
        [ENTRY]:      [OP.ORA_IND_Y, 200],
        [200]:        [0x11, 0x22],
        [0x2211 + 1]: [100],
      },
      a: 123,
      y: 1,
    },
    out: {
      a: 100 | 123,
      pc: ENTRY + 2,
    },
  },
  //
  // AND
  //
  {
    name: 'and_imm',
    in: {
      mem: {
        [ENTRY]: [OP.AND_IMM, 123],
      },
      a: 100,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'and_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.AND_ZPG, 5],
        [5]:      [123]
      },
      a: 100,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'and_zpg_x',
    in: {
      mem: {
        [ENTRY]:  [OP.AND_ZPG_X, 30],
        [50]:     [100],
      },
      a: 123,
      x: 20,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'and_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.AND_ABS, 0x22, 0x11],
        [0x1122]: [100],
      },
      a: 123,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'and_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.AND_ABS_X, 0x22, 0x11],
        [0x1122 + 2]: [100],
      },
      a: 123,
      x: 2,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'and_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.AND_ABS_Y, 0x22, 0x11],
        [0x1122 + 2]: [100],
      },
      a: 123,
      y: 2,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'and_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.AND_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
        [0x2211]:   [100],
      },
      a: 123,
      x: 20,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'and_ind_y',
    in: {
      mem: {
        [ENTRY]:      [OP.AND_IND_Y, 200],
        [200]:        [0x11, 0x22],
        [0x2211 + 1]: [100],
      },
      a: 123,
      y: 1,
    },
    out: {
      a: 100 & 123,
      pc: ENTRY + 2,
    },
  },
  //
  // EOR
  //
  {
    name: 'eor_imm',
    in: {
      mem: {
        [ENTRY]: [OP.EOR_IMM, 123],
      },
      a: 100,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'eor_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.EOR_ZPG, 5],
        [5]:      [123]
      },
      a: 100,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'eor_zpg_x',
    in: {
      mem: {
        [ENTRY]:  [OP.EOR_ZPG_X, 30],
        [50]:     [100],
      },
      a: 123,
      x: 20,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'eor_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.EOR_ABS, 0x22, 0x11],
        [0x1122]: [100],
      },
      a: 123,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'eor_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.EOR_ABS_X, 0x22, 0x11],
        [0x1122 + 2]: [100],
      },
      a: 123,
      x: 2,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'eor_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.EOR_ABS_Y, 0x22, 0x11],
        [0x1122 + 2]: [100],
      },
      a: 123,
      y: 2,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'eor_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.EOR_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
        [0x2211]:   [100],
      },
      a: 123,
      x: 20,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'eor_ind_y',
    in: {
      mem: {
        [ENTRY]:      [OP.EOR_IND_Y, 200],
        [200]:        [0x11, 0x22],
        [0x2211 + 1]: [100],
      },
      a: 123,
      y: 1,
    },
    out: {
      a: 100 ^ 123,
      pc: ENTRY + 2,
    },
  },
  //
  // BIT
  //
  {
    name: 'bit_zpg',
    in: {
      mem: {
        [ENTRY]:      [OP.BIT_ZPG, 200],
        [200]:        [0b1100_0000],
      },
      a: 0b0011_1111,
    },
    out: {
      sr: 0b1100_0010,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bit_abs',
    in: {
      mem: {
        [ENTRY]:      [OP.BIT_ABS, 0x11, 0x22],
        [0x2211]:     [0b1100_0000],
      },
      a: 0b0011_1111,
    },
    out: {
      sr: 0b1100_0010,
      pc: ENTRY + 3,
    },
  },
] as TestCase[]