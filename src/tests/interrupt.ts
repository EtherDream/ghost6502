import {TestCase, OP, STACK, ENTRY, STATUS, H8, L8} from './_.js'

export default [
  {
    name: 'reset',
    in: {
      mem: {
        [0x1122]: [OP.LDA_IMM, 10],
        [0xFFFC]: [0x22, 0x11],
      },
    },
    out: {
      pc: 0x1122 + 2,
      a: 10,
      sr: STATUS.DEFAULT,
    },
    methods: ['reset'],
  },
  {
    name: 'nmi',
    in: {
      mem: {
        [0x3344]: [OP.LDA_IMM, 20],
        [0xFFFA]: [0x44, 0x33],
      },
      pc: 0x8899,
      sr: STATUS.C,
    },
    out: {
      mem: {
        [STACK - 2]: [STATUS.C, 0x99, 0x88],
      },
      pc: 0x3344 + 2,
      a: 20,
      sr: STATUS.C,
      sp: 0xFF - 3,
    },
    methods: ['nmi'],
  },
  {
    name: 'irq',
    in: {
      mem: {
        [0x5566]: [OP.LDA_IMM, 30],
        [0xFFFE]: [0x66, 0x55],
      },
      pc: 0x8899,
      sr: STATUS.C,
    },
    out: {
      mem: {
        [STACK - 2]: [STATUS.C, 0x99, 0x88],
      },
      pc: 0x5566 + 2,
      a: 30,
      sr: STATUS.C | STATUS.I,
      sp: 0xFF - 3,
    },
    methods: ['irq'],
  },
  {
    name: 'irq (masked)',
    in: {
      mem: {
        [0x5566]: [OP.LDA_IMM, 40],
        [0xFFFE]: [0x66, 0x55],
      },
      pc: 0x8899,
      sr: STATUS.C | STATUS.I,
    },
    out: {
    },
    methods: ['irq'],
  },
  {
    name: 'run method',
    in: {
      mem: {
        [0x1122]: [
          OP.LDX_IMM, 10,
          OP.INX,
          OP.INX,
        ],
      },
      pc: 0x1122,
    },
    out: {
      pc: 0x1122 + 4,
      x: 12,
    },
    loop: 3,
    methods: ['run']
  },
  {
    name: 'mixed',
    in: {
      mem: {
        // reset
        [0x1100]: [
          /* $1100 */ OP.LDA_IMM, 10,
          /* $1102 */ OP.LDA_IMM, 11,
          /* $1104 */ OP.BRK,
        ],
        [0xFFFC]: [0x00, 0x11],

        // nmi
        [0x2200]: [
          /* $2200 */ OP.LDX_IMM, 20,
          /* $2202 */ OP.LDX_IMM, 21,
          /* $2204 */ OP.RTI,
        ],
        [0xFFFA]: [0x00, 0x22],

        // irq
        [0x3300]: [
          /* $3300 */ OP.LDY_IMM, 30,
          /* $3302 */ OP.LDY_IMM, 31,
          /* $3304 */ OP.RTI,
        ],
        [0xFFFE]: [0x00, 0x33],
      },
    },
    out: {
      mem: {
        [STACK - 5]: [
          STATUS.DEFAULT, 0x02, 0x22,   // (2). pushed by irq
          STATUS.DEFAULT, 0x02, 0x11,   // (1). pushed by nmi
        ]
      },
      a: 11,
      x: 21,
      y: 31,
      pc: 0x1104 + 1,
      sr: STATUS.DEFAULT,
    },
    loop: 1,
    methods: [
      'reset', 'nmi', 'irq',
      'run', 'run', 'run',
      'run', 'run', 'run',
    ],
  },
] as TestCase[]