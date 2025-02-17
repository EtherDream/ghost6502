import {TestCase, OP, ENTRY, STATUS} from './_.js'

export default [
  //
  // ASL (Shift Left One Bit)
  //
  {
    name: 'asl_a',
    in: {
      mem: {
        [ENTRY]: [OP.ASL_A],
      },
      a: 0b0010_1010,
    },
    out: {
      a: 0b010_1010_0,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'asl_a (flag_z)',
    in: {
      mem: {
        [ENTRY]: [OP.ASL_A],
      },
      a: 0,
    },
    out: {
      sr: STATUS.Z,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'asl_a (flag_c)',
    in: {
      mem: {
        [ENTRY]: [OP.ASL_A],
      },
      a: 0b1000_0001,
    },
    out: {
      a: 0b10,
      sr: STATUS.C,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'asl_a (flag_c_z)',
    in: {
      mem: {
        [ENTRY]: [OP.ASL_A],
      },
      a: 0b1000_0000,
    },
    out: {
      a: 0,
      sr: STATUS.C | STATUS.Z,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'asl_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.ASL_ZPG, 200],
        [200]:    [0b1100_0000],
      },
    },
    out: {
      mem: {
        [200]:    [0b100_0000_0],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'asl_zpg_x',
    in: {
      mem: {
        [ENTRY]:    [OP.ASL_ZPG_X, 200],
        [200 + 5]:  [0b1100_0000],
      },
      x: 5,
    },
    out: {
      mem: {
        [200 + 5]:  [0b100_0000_0],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'asl_abs',
    in: {
      mem: {
        [ENTRY]:    [OP.ASL_ABS, 0x22, 0x11],
        [0x1122]:   [0b1100_0000],
      },
    },
    out: {
      mem: {
        [0x1122]:  [0b100_0000_0],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'asl_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.ASL_ABS_X, 0x22, 0x11],
        [0x1122 + 5]: [0b1100_0000],
      },
      x: 5,
    },
    out: {
      mem: {
        [0x1122 + 5]: [0b100_0000_0],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 3,
    },
  },
  //
  // LSR (Shift One Bit Right)
  //
  {
    name: 'lsr_a',
    in: {
      mem: {
        [ENTRY]: [OP.LSR_A],
      },
      a: 0b1010_1010,
    },
    out: {
      a: 0b0_1010_101,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'lsr_a (flag_z)',
    in: {
      mem: {
        [ENTRY]: [OP.LSR_A],
      },
      a: 0,
    },
    out: {
      sr: STATUS.Z,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'lsr_a (flag_c)',
    in: {
      mem: {
        [ENTRY]: [OP.LSR_A],
      },
      a: 0b1000_0001,
    },
    out: {
      a: 0b0_1000_000,
      sr: STATUS.C,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'lsr_a (flag_c_z)',
    in: {
      mem: {
        [ENTRY]: [OP.LSR_A],
      },
      a: 0b1,
    },
    out: {
      a: 0,
      sr: STATUS.C | STATUS.Z,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'lsr_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.LSR_ZPG, 200],
        [200]:    [0b1000_0001],
      },
    },
    out: {
      mem: {
        [200]:    [0b0_1000_000],
      },
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'lsr_zpg_x',
    in: {
      mem: {
        [ENTRY]:    [OP.LSR_ZPG_X, 200],
        [200 + 5]:  [0b1000_0001],
      },
      x: 5,
    },
    out: {
      mem: {
        [200 + 5]:  [0b0_1000_000],
      },
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'lsr_abs',
    in: {
      mem: {
        [ENTRY]:    [OP.LSR_ABS, 0x22, 0x11],
        [0x1122]:   [0b1000_0001],
      },
    },
    out: {
      mem: {
        [0x1122]:   [0b0_1000_000],
      },
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'lsr_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.LSR_ABS_X, 0x22, 0x11],
        [0x1122 + 5]: [0b1000_0001],
      },
      x: 5,
    },
    out: {
      mem: {
        [0x1122 + 5]: [0b0_1000_000],
      },
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  //
  // ROL
  //
  {
    name: 'rol_a',
    in: {
      mem: {
        [ENTRY]: [OP.ROL_A],
      },
      a: 0b0010_1010,
    },
    out: {
      a: 0b010_1010_0,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'rol_a (flag_cn)',
    in: {
      mem: {
        [ENTRY]: [OP.ROL_A],
      },
      a: 0b1100_1010,
    },
    out: {
      a: 0b100_1010_0,
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'rol_a (flag_cn_c)',
    in: {
      mem: {
        [ENTRY]: [OP.ROL_A],
      },
      sr: STATUS.C,
      a: 0b1100_1010,
    },
    out: {
      a: 0b100_1010_1,
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'rol_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.ROL_ZPG, 200],
        [200]:    [0b0010_1010],
      },
    },
    out: {
      mem: {
        [200]:    [0b010_1010_0],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'rol_zpg_x',
    in: {
      mem: {
        [ENTRY]:    [OP.ROL_ZPG_X, 200],
        [200 + 5]:  [0b0010_1010],
      },
      x: 5,
    },
    out: {
      mem: {
        [200 + 5]:  [0b010_1010_0],
      },
      pc: ENTRY + 2,
    },
  },
  {
    name: 'rol_abs',
    in: {
      mem: {
        [ENTRY]:    [OP.ROL_ABS, 0x22, 0x11],
        [0x1122]:   [0b0010_1010],
      },
    },
    out: {
      mem: {
        [0x1122]:   [0b010_1010_0],
      },
      pc: ENTRY + 3,
    },
  },
  {
    name: 'rol_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.ROL_ABS_X, 0x22, 0x11],
        [0x1122 + 5]: [0b0010_1010],
      },
      x: 5,
    },
    out: {
      mem: {
        [0x1122 + 5]: [0b010_1010_0],
      },
      pc: ENTRY + 3,
    },
  },
  //
  // ROR
  //
  {
    name: 'ror_a',
    in: {
      mem: {
        [ENTRY]: [OP.ROR_A],
      },
      a: 0b1010_1010,
    },
    out: {
      a: 0b0_1010_101,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'ror_a (flag_z)',
    in: {
      mem: {
        [ENTRY]: [OP.ROR_A],
      },
      a: 0,
    },
    out: {
      sr: STATUS.Z,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'ror_a (flag_c)',
    in: {
      mem: {
        [ENTRY]: [OP.ROR_A],
      },
      a: 0b1000_0001,
    },
    out: {
      a: 0b0_1000_000,
      sr: STATUS.C,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'ror_a (flag_cz)',
    in: {
      mem: {
        [ENTRY]: [OP.ROR_A],
      },
      a: 0b1,
    },
    out: {
      a: 0,
      sr: STATUS.C | STATUS.Z,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'ror_a (flag_cn_c)',
    in: {
      mem: {
        [ENTRY]: [OP.ROR_A],
      },
      a: 0b0000_0001,
      sr: STATUS.C,
    },
    out: {
      a: 0b1_0000_000,
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 1,
    },
  },
  {
    name: 'ror_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.ROR_ZPG, 200],
        [200]:    [0b0000_0001],
      },
      sr: STATUS.C,
    },
    out: {
      mem: {
        [200]:    [0b1_0000_000],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ror_zpg_x',
    in: {
      mem: {
        [ENTRY]:    [OP.ROR_ZPG_X, 200],
        [200 + 5]:  [0b0000_0001],
      },
      sr: STATUS.C,
      x: 5,
    },
    out: {
      mem: {
        [200 + 5]:  [0b1_0000_000],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'ror_abs',
    in: {
      mem: {
        [ENTRY]:    [OP.ROR_ABS, 0x22, 0x11],
        [0x1122]:   [0b0000_0001],
      },
      sr: STATUS.C,
    },
    out: {
      mem: {
        [0x1122]:   [0b1_0000_000],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'ror_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.ROR_ABS_X, 0x22, 0x11],
        [0x1122 + 5]: [0b0000_0001],
      },
      sr: STATUS.C,
      x: 5,
    },
    out: {
      mem: {
        [0x1122 + 5]: [0b1_0000_000],
      },
      sr: STATUS.C | STATUS.N,
      pc: ENTRY + 3,
    },
  },
] as TestCase[]