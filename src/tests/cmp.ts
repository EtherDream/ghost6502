import {TestCase, OP, ENTRY, STATUS} from './_.js'

export default [
  //
  // CMP
  //
  {
    name: 'cmp_imm',
    in: {
      mem: {
        [ENTRY]: [OP.CMP_IMM, 30],
      },
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cmp_imm (flag_z)',
    in: {
      mem: {
        [ENTRY]: [OP.CMP_IMM, 100],
      },
      a: 100,
    },
    out: {
      sr: STATUS.Z | STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cmp_imm (flag_c_clear)',
    in: {
      mem: {
        [ENTRY]: [OP.CMP_IMM, 101],
      },
      a: 100,
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cmp_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.CMP_ZPG, 5],
        [5]:      [70]
      },
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cmp_zpg_x',
    in: {
      mem: {
        [ENTRY]:    [OP.CMP_ZPG_X, 30],
        [30 + 20]:  [70],
      },
      x: 20,
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cmp_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.CMP_ABS, 0x22, 0x11],
        [0x1122]: [70],
      },
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'cmp_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.CMP_ABS_X, 0x22, 0x11],
        [0x1122 + 2]: [70],
      },
      x: 2,
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'cmp_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.CMP_ABS_Y, 0x22, 0x11],
        [0x1122 + 2]: [70],
      },
      y: 2,
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'cmp_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.CMP_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
        [0x2211]:   [70],
      },
      x: 20,
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cmp_ind_y',
    in: {
      mem: {
        [ENTRY]:      [OP.CMP_IND_Y, 200],
        [200]:        [0x11, 0x22],
        [0x2211 + 1]: [70],
      },
      y: 1,
      a: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  //
  // CPX
  //
  {
    name: 'cpx_imm',
    in: {
      mem: {
        [ENTRY]: [OP.CPX_IMM, 30],
      },
      x: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cpx_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.CPX_ZPG, 5],
        [5]:      [70]
      },
      x: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cpx_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.CPX_ABS, 0x22, 0x11],
        [0x1122]: [70],
      },
      x: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  //
  // CPY
  //
  {
    name: 'cpy_imm',
    in: {
      mem: {
        [ENTRY]: [OP.CPY_IMM, 30],
      },
      y: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cpy_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.CPY_ZPG, 5],
        [5]:      [70]
      },
      y: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'cpy_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.CPY_ABS, 0x22, 0x11],
        [0x1122]: [70],
      },
      y: 100,
    },
    out: {
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
] as TestCase[]