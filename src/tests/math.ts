import {TestCase, OP, ENTRY, STATUS, L8, L16} from './_.js'

export default [
  //
  // ADC
  //
  {
    name: 'adc_imm',
    in: {
      mem: {
        [ENTRY]: [OP.ADC_IMM, 30],
      },
      a: 20
    },
    out: {
      a: 20 + 30,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_imm (flag_n)',
    in: {
      mem: {
        [ENTRY]: [OP.ADC_IMM, 128],
      },
      a: 1
    },
    out: {
      a: 128 + 1,
      sr: STATUS.N,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_imm (flag_c)',
    in: {
      mem: {
        [ENTRY]: [OP.ADC_IMM, 30],
      },
      a: 250
    },
    out: {
      a: (250 + 30) & 0xFF,
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_imm (flag_z)',
    in: {
      mem: {
        [ENTRY]: [OP.ADC_IMM, 0],
      },
      a: 0
    },
    out: {
      sr: STATUS.Z,
      pc: ENTRY + 2,
    },
  },
  // TODO:
  {
    name: 'adc_imm (flag_nv)',
    in: {
      mem: {
        [ENTRY]: [OP.ADC_IMM, 64],
      },
      a: 64,
    },
    out: {
      a: 64 + 64,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_imm (flag_c_in)',
    in: {
      mem: {
        [ENTRY]: [OP.ADC_IMM, 2],
      },
      sr: STATUS.C,
      a: 10,
    },
    out: {
      sr: 0,
      a: 10 + 2 + 1,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_imm (flag_c_c)',
    in: {
      mem: {
        [ENTRY]: [OP.ADC_IMM, 250],
      },
      sr: STATUS.C,
      a: 10,
    },
    out: {
      sr: STATUS.C,
      a: L8(250 + 10 + 1),
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.ADC_ZPG, 200],
        [200]:    [100]
      },
      a: 30,
    },
    out: {
      a: 100 + 30,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_zpg_x',
    in: {
      mem: {
        [ENTRY]:    [OP.ADC_ZPG_X, 200],
        [200 + 5]:  [100]
      },
      x: 5,
      a: 30,
    },
    out: {
      a: 100 + 30,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.ADC_ABS, 0x11, 0x22],
        [0x2211]: [100]
      },
      a: 30,
    },
    out: {
      a: 100 + 30,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'adc_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.ADC_ABS_X, 0x11, 0x22],
        [0x2211 + 5]: [100]
      },
      x: 5,
      a: 30,
    },
    out: {
      a: 100 + 30,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'adc_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.ADC_ABS_Y, 0x11, 0x22],
        [0x2211 + 5]: [100]
      },
      y: 5,
      a: 30,
    },
    out: {
      a: 100 + 30,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'adc_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.ADC_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
        [0x2211]:   [100],
      },
      x: 20,
      a: 30,
    },
    out: {
      a: 100 + 30,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'adc_ind_y',
    in: {
      mem: {
        [ENTRY]:      [OP.ADC_IND_Y, 200],
        [200]:        [0x11, 0x22],
        [0x2211 + 1]: [100],
      },
      y: 1,
      a: 30,
    },
    out: {
      a: 100 + 30,
      sr: STATUS.N | STATUS.V,
      pc: ENTRY + 2,
    },
  },
  //
  // SBC
  //
  {
    name: 'sbc_imm',
    in: {
      mem: {
        [ENTRY]: [OP.SBC_IMM, 10],
      },
      a: 30
    },
    out: {
      sr: STATUS.C,
      a: 30 - 10 - 1,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_imm (flag_n)',
    in: {
      mem: {
        [ENTRY]: [OP.SBC_IMM, 2],
      },
      a: 131
    },
    out: {
      a: 131 - 2 - 1,
      sr: STATUS.N | STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_imm (flag_c_clear)',
    in: {
      mem: {
        [ENTRY]: [OP.SBC_IMM, 250],
      },
      a: 100
    },
    out: {
      a: L8(100 - 250 - 1),
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_imm (flag_z)',
    in: {
      mem: {
        [ENTRY]: [OP.SBC_IMM, 8],
      },
      a: 9
    },
    out: {
      a: 9 - 8 - 1,
      sr: STATUS.Z | STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_imm (flag_v)',
    in: {
      mem: {
        [ENTRY]: [OP.SBC_IMM, 120],
      },
      a: 128,
    },
    out: {
      a: 128 - 120 - 1,
      sr: STATUS.V | STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_imm (flag_c_in)',
    in: {
      mem: {
        [ENTRY]: [OP.SBC_IMM, 2],
      },
      sr: STATUS.C,
      a: 10,
    },
    out: {
      a: 10 - 2,
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_imm (flag_c_c)',
    in: {
      mem: {
        [ENTRY]: [OP.SBC_IMM, 250],
      },
      sr: STATUS.C,
      a: 100,
    },
    out: {
      sr: 0,
      a: L8(100 - 250),
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_zpg',
    in: {
      mem: {
        [ENTRY]:  [OP.SBC_ZPG, 200],
        [200]:    [30]
      },
      a: 50,
    },
    out: {
      a: 50 - 30 - 1,
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_zpg_x',
    in: {
      mem: {
        [ENTRY]:    [OP.SBC_ZPG_X, 200],
        [200 + 5]:  [30]
      },
      x: 5,
      a: 50,
    },
    out: {
      a: 50 - 30 - 1,
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.SBC_ABS, 0x11, 0x22],
        [0x2211]: [30]
      },
      a: 50,
    },
    out: {
      a: 50 - 30 - 1,
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'sbc_abs_x',
    in: {
      mem: {
        [ENTRY]:      [OP.SBC_ABS_X, 0x11, 0x22],
        [0x2211 + 5]: [30]
      },
      x: 5,
      a: 50,
    },
    out: {
      a: 50 - 30 - 1,
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'sbc_abs_y',
    in: {
      mem: {
        [ENTRY]:      [OP.SBC_ABS_Y, 0x11, 0x22],
        [0x2211 + 5]: [30]
      },
      y: 5,
      a: 50,
    },
    out: {
      a: 50 - 30 - 1,
      sr: STATUS.C,
      pc: ENTRY + 3,
    },
  },
  {
    name: 'sbc_ind_x',
    in: {
      mem: {
        [ENTRY]:    [OP.SBC_IND_X, 30],
        [30 + 20]:  [0x11, 0x22],
        [0x2211]:   [30],
      },
      x: 20,
      a: 50,
    },
    out: {
      a: 50 - 30 - 1,
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
  {
    name: 'sbc_ind_y',
    in: {
      mem: {
        [ENTRY]:      [OP.SBC_IND_Y, 200],
        [200]:        [0x11, 0x22],
        [0x2211 + 1]: [30],
      },
      y: 1,
      a: 50,
    },
    out: {
      a: 50 - 30 - 1,
      sr: STATUS.C,
      pc: ENTRY + 2,
    },
  },
] as TestCase[]