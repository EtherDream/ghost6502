import {TestCase, OP, ENTRY, STATUS} from './_.js'

export default [
  //
  // branch
  //
  {
    name: 'bcc (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BCC, 5],
      },
      sr: 0xFF & ~STATUS.C,
    },
    out: {
      pc: ENTRY + 2 + 5,
    },
  },
  {
    name: 'bcc (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BCC, 5],
      },
      sr: STATUS.C
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bcs (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BCS, -1],
      },
      sr: STATUS.C,
    },
    out: {
      pc: ENTRY + 2 - 1,
    },
  },
  {
    name: 'bcs (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BCS, 5],
      },
      sr: 0xFF & ~STATUS.C
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'beq (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BEQ, 0],
      },
      sr: STATUS.Z,
    },
    out: {
      pc: ENTRY + 2 + 0,
    },
  },
  {
    name: 'beq (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BEQ, 5],
      },
      sr: 0xFF & ~STATUS.Z
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bmi (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BMI, 5],
      },
      sr: STATUS.N,
    },
    out: {
      pc: ENTRY + 2 + 5,
    },
  },
  {
    name: 'bmi (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BMI, 5],
      },
      sr: 0xFF & ~STATUS.N
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bne (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BNE, 5],
      },
      sr: 0xFF & ~STATUS.Z
    },
    out: {
      pc: ENTRY + 2 + 5,
    },
  },
  {
    name: 'bne (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BNE, 5],
      },
      sr: STATUS.Z
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bpl (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BPL, 5],
      },
      sr: 0xFF & ~STATUS.N
    },
    out: {
      pc: ENTRY + 2 + 5,
    },
  },
  {
    name: 'bpl (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BPL, 5],
      },
      sr: STATUS.N
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bvc (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BVC, 5],
      },
      sr: 0xFF & ~STATUS.V
    },
    out: {
      pc: ENTRY + 2 + 5,
    },
  },
  {
    name: 'bvc (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BVC, 5],
      },
      sr: STATUS.V
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  {
    name: 'bvs (on)',
    in: {
      mem: {
        [ENTRY]: [OP.BVS, 5],
      },
      sr: STATUS.V
    },
    out: {
      pc: ENTRY + 2 + 5,
    },
  },
  {
    name: 'bvs (off)',
    in: {
      mem: {
        [ENTRY]: [OP.BVS, 5],
      },
      sr: 0xFF & ~STATUS.V
    },
    out: {
      pc: ENTRY + 2,
    },
  },
  //
  // jump
  //
  {
    name: 'jmp_abs',
    in: {
      mem: {
        [ENTRY]:  [OP.JMP_ABS, 0x11, 0x22],
      },
    },
    out: {
      pc: 0x2211,
    },
  },
  {
    name: 'jmp_ind',
    in: {
      mem: {
        [ENTRY]:  [OP.JMP_IND, 0x11, 0x22],
        [0x2211]: [0x33, 0x44],
      },
    },
    out: {
      pc: 0x4433,
    },
  },
] as TestCase[]