// const enum OP {
enum OP {
  BRK         = 0x00,
  NOP         = 0xEA,

  //
  // stack
  //
  PHA         = 0x48,
  PLA         = 0x68,

  PHP         = 0x08,
  PLP         = 0x28,

  //
  // load
  //
  LDA_IMM     = 0xA9,
  LDA_ZPG     = 0xA5,
  LDA_ZPG_X   = 0xB5,
  LDA_ABS     = 0xAD,
  LDA_ABS_X   = 0xBD,
  LDA_ABS_Y   = 0xB9,
  LDA_IND_X   = 0xA1,
  LDA_IND_Y   = 0xB1,

  LDX_IMM     = 0xA2,
  LDX_ZPG     = 0xA6,
  LDX_ZPG_Y   = 0xB6,
  LDX_ABS     = 0xAE,
  LDX_ABS_Y   = 0xBE,

  LDY_IMM     = 0xA0,
  LDY_ZPG     = 0xA4,
  LDY_ZPG_X   = 0xB4,
  LDY_ABS     = 0xAC,
  LDY_ABS_X   = 0xBC,

  //
  // store
  //
  STA_ZPG     = 0x85,
  STA_ZPG_X   = 0x95,
  STA_ABS     = 0x8D,
  STA_ABS_X   = 0x9D,
  STA_ABS_Y   = 0x99,
  STA_IND_X   = 0x81,
  STA_IND_Y   = 0x91,

  STX_ZPG     = 0x86,
  STX_ZPG_Y   = 0x96,
  STX_ABS     = 0x8E,

  STY_ZPG     = 0x84,
  STY_ZPG_X   = 0x94,
  STY_ABS     = 0x8C,

  //
  // transfer
  //
  TAX         = 0xAA,
  TXA         = 0x8A,

  TAY         = 0xA8,
  TYA         = 0x98,

  TSX         = 0xBA,
  TXS         = 0x9A,

  //
  // ORA
  //
  ORA_IMM     = 0x09,
  ORA_ZPG     = 0x05,
  ORA_ZPG_X   = 0x15,
  ORA_ABS     = 0x0D,
  ORA_ABS_X   = 0x1D,
  ORA_ABS_Y   = 0x19,
  ORA_IND_X   = 0x01,
  ORA_IND_Y   = 0x11,

  //
  // AND
  //
  AND_IMM     = 0x29,
  AND_ZPG     = 0x25,
  AND_ZPG_X   = 0x35,
  AND_ABS     = 0x2D,
  AND_ABS_X   = 0x3D,
  AND_ABS_Y   = 0x39,
  AND_IND_X   = 0x21,
  AND_IND_Y   = 0x31,

  //
  // EOR
  //
  EOR_IMM     = 0x49,
  EOR_ZPG     = 0x45,
  EOR_ZPG_X   = 0x55,
  EOR_ABS     = 0x4D,
  EOR_ABS_X   = 0x5D,
  EOR_ABS_Y   = 0x59,
  EOR_IND_X   = 0x41,
  EOR_IND_Y   = 0x51,

  //
  // BIT
  //
  BIT_ZPG     = 0x24,
  BIT_ABS     = 0x2C,

  //
  // ASL
  //
  ASL_A       = 0x0A,
  ASL_ZPG     = 0x06,
  ASL_ZPG_X   = 0x16,
  ASL_ABS     = 0x0E,
  ASL_ABS_X   = 0x1E,

  //
  // LSR
  //
  LSR_A       = 0x4A,
  LSR_ZPG     = 0x46,
  LSR_ZPG_X   = 0x56,
  LSR_ABS     = 0x4E,
  LSR_ABS_X   = 0x5E,

  //
  // ROL
  //
  ROL_A       = 0x2A,
  ROL_ZPG     = 0x26,
  ROL_ZPG_X   = 0x36,
  ROL_ABS     = 0x2E,
  ROL_ABS_X   = 0x3E,

  //
  // ROR
  //
  ROR_A       = 0x6A,
  ROR_ZPG     = 0x66,
  ROR_ZPG_X   = 0x76,
  ROR_ABS     = 0x6E,
  ROR_ABS_X   = 0x7E,

  //
  // INC
  //
  INC_ZPG     = 0xE6,
  INC_ZPG_X   = 0xF6,
  INC_ABS     = 0xEE,
  INC_ABS_X   = 0xFE,

  INX         = 0xE8,
  INY         = 0xC8,

  //
  // DEC
  //
  DEC_ZPG     = 0xC6,
  DEC_ZPG_X   = 0xD6,
  DEC_ABS     = 0xCE,
  DEC_ABS_X   = 0xDE,

  DEX         = 0xCA,
  DEY         = 0x88,

  //
  // CMP
  //
  CMP_IMM     = 0xC9,
  CMP_ZPG     = 0xC5,
  CMP_ZPG_X   = 0xD5,
  CMP_ABS     = 0xCD,
  CMP_ABS_X   = 0xDD,
  CMP_ABS_Y   = 0xD9,
  CMP_IND_X   = 0xC1,
  CMP_IND_Y   = 0xD1,

  CPX_IMM     = 0xE0,
  CPX_ZPG     = 0xE4,
  CPX_ABS     = 0xEC,

  CPY_IMM     = 0xC0,
  CPY_ZPG     = 0xC4,
  CPY_ABS     = 0xCC,

  //
  // ADC
  //
  ADC_IMM     = 0x69,
  ADC_ZPG     = 0x65,
  ADC_ZPG_X   = 0x75,
  ADC_ABS     = 0x6D,
  ADC_ABS_X   = 0x7D,
  ADC_ABS_Y   = 0x79,
  ADC_IND_X   = 0x61,
  ADC_IND_Y   = 0x71,

  //
  // SBC
  //
  SBC_IMM     = 0xE9,
  SBC_ZPG     = 0xE5,
  SBC_ZPG_X   = 0xF5,
  SBC_ABS     = 0xED,
  SBC_ABS_X   = 0xFD,
  SBC_ABS_Y   = 0xF9,
  SBC_IND_X   = 0xE1,
  SBC_IND_Y   = 0xF1,

  //
  // status
  //
  CLC         = 0x18,
  CLD         = 0xD8,
  CLI         = 0x58,
  CLV         = 0xB8,

  SEC         = 0x38,
  SED         = 0xF8,
  SEI         = 0x78,

  //
  // jump
  //
  JMP_ABS     = 0x4C,
  JMP_IND     = 0x6C,

  JSR         = 0x20,
  RTI         = 0x40,
  RTS         = 0x60,

  //
  // branch
  //
  BPL         = 0x10,
  BMI         = 0x30,
  BVC         = 0x50,
  BVS         = 0x70,
  BCC         = 0x90,
  BNE         = 0xD0,
  BCS         = 0xB0,
  BEQ         = 0xF0,
}

export default OP