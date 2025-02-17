import {TestCase, OP, ENTRY, STATUS, L8, L16} from './_.js'

export default [
  //
  // LDA
  //
  {
    name: 'lda_imm',
    in: {
      mem: {
        [ENTRY]: [OP.LDA_IMM, 0x7F],
      },
    },
    out: {
      a: 0x7F,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'lda_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.LDA_ZPG, 100],
        [100]:    [5],
      },
    },
    out: {
      a: 5,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'lda_zpg_x',
    in: {
      mem: {
        [ENTRY]: [OP.LDA_ZPG_X, 30],
        [50]: [5],
      },
      x: 20,
    },
    out: {
      a: 5,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'lda_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.LDA_ABS, 0x22, 0x11],
        [0x1122]: [5],
      },
      x: 1,
      y: 2,
    },
    out: {
      a: 5,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'lda_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.LDA_ABS_X, 0x22, 0x11],
        [0x1122 + 1]: [5],
      },
      x: 1,
      y: 2,
    },
    out: {
      a: 5,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'lda_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.LDA_ABS_Y, 0x22, 0x11],
        [0x1122 + 2]: [5],
      },
      x: 1,
      y: 2,
    },
    out: {
      a: 5,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'lda_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.LDA_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
        [0x2211]:   [5],
      },
      x: 20,
      y: 30,
    },
    out: {
      a: 5,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'lda_ind_y',
    in: {
      mem: {
        [ENTRY]:        [OP.LDA_IND_Y, 200],
        [200]:          [0x11, 0x22],
        [0x2211 + 30]:  [5],
      },
      x: 20,
      y: 30,
    },
    out: {
      a: 5,
      pc: ENTRY + 2,
    },
  },
  //
  // LDX
  //
  {
    name: 'ldx_imm',
    in: {
      mem: {
        [ENTRY]: [OP.LDX_IMM, 0x7F],
      },
    },
    out: {
      x: 0x7F,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ldx_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.LDX_ZPG, 100],
        [100]:    [5],
      },
    },
    out: {
      x: 5,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ldx_zpg_y',
    in: {
      mem: {
        [ENTRY]: [OP.LDX_ZPG_Y, 30],
        [50]: [5],
      },
      y: 20,
    },
    out: {
      x: 5,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ldx_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.LDX_ABS, 0x22, 0x11],
        [0x1122]: [5],
      },
    },
    out: {
      x: 5,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'ldx_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.LDX_ABS_Y, 0x22, 0x11],
        [0x1122 + 2]: [5],
      },
      y: 2,
    },
    out: {
      x: 5,
      pc: ENTRY + 3,
    },
  },
  //
  // LDY
  //
  {
    name: 'ldy_imm',
    in: {
      mem: {
        [ENTRY]: [OP.LDY_IMM, 0x7F],
      },
    },
    out: {
      y: 0x7F,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ldy_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.LDY_ZPG, 100],
        [100]:    [5],
      },
    },
    out: {
      y: 5,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ldy_zpg_x',
    in: {
      mem: {
        [ENTRY]: [OP.LDY_ZPG_X, 30],
        [50]: [5],
      },
      x: 20,
    },
    out: {
      y: 5,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ldy_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.LDY_ABS, 0x22, 0x11],
        [0x1122]: [5],
      },
    },
    out: {
      y: 5,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'ldy_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.LDY_ABS_X, 0x22, 0x11],
        [0x1122 + 2]: [5],
      },
      x: 2,
    },
    out: {
      y: 5,
      pc: ENTRY + 3,
    },
  },
] as TestCase[]