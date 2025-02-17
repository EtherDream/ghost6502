// const enum OP {
var OP;
(function (OP) {
    OP[OP["BRK"] = 0] = "BRK";
    OP[OP["NOP"] = 234] = "NOP";
    //
    // stack
    //
    OP[OP["PHA"] = 72] = "PHA";
    OP[OP["PLA"] = 104] = "PLA";
    OP[OP["PHP"] = 8] = "PHP";
    OP[OP["PLP"] = 40] = "PLP";
    //
    // load
    //
    OP[OP["LDA_IMM"] = 169] = "LDA_IMM";
    OP[OP["LDA_ZPG"] = 165] = "LDA_ZPG";
    OP[OP["LDA_ZPG_X"] = 181] = "LDA_ZPG_X";
    OP[OP["LDA_ABS"] = 173] = "LDA_ABS";
    OP[OP["LDA_ABS_X"] = 189] = "LDA_ABS_X";
    OP[OP["LDA_ABS_Y"] = 185] = "LDA_ABS_Y";
    OP[OP["LDA_IND_X"] = 161] = "LDA_IND_X";
    OP[OP["LDA_IND_Y"] = 177] = "LDA_IND_Y";
    OP[OP["LDX_IMM"] = 162] = "LDX_IMM";
    OP[OP["LDX_ZPG"] = 166] = "LDX_ZPG";
    OP[OP["LDX_ZPG_Y"] = 182] = "LDX_ZPG_Y";
    OP[OP["LDX_ABS"] = 174] = "LDX_ABS";
    OP[OP["LDX_ABS_Y"] = 190] = "LDX_ABS_Y";
    OP[OP["LDY_IMM"] = 160] = "LDY_IMM";
    OP[OP["LDY_ZPG"] = 164] = "LDY_ZPG";
    OP[OP["LDY_ZPG_X"] = 180] = "LDY_ZPG_X";
    OP[OP["LDY_ABS"] = 172] = "LDY_ABS";
    OP[OP["LDY_ABS_X"] = 188] = "LDY_ABS_X";
    //
    // store
    //
    OP[OP["STA_ZPG"] = 133] = "STA_ZPG";
    OP[OP["STA_ZPG_X"] = 149] = "STA_ZPG_X";
    OP[OP["STA_ABS"] = 141] = "STA_ABS";
    OP[OP["STA_ABS_X"] = 157] = "STA_ABS_X";
    OP[OP["STA_ABS_Y"] = 153] = "STA_ABS_Y";
    OP[OP["STA_IND_X"] = 129] = "STA_IND_X";
    OP[OP["STA_IND_Y"] = 145] = "STA_IND_Y";
    OP[OP["STX_ZPG"] = 134] = "STX_ZPG";
    OP[OP["STX_ZPG_Y"] = 150] = "STX_ZPG_Y";
    OP[OP["STX_ABS"] = 142] = "STX_ABS";
    OP[OP["STY_ZPG"] = 132] = "STY_ZPG";
    OP[OP["STY_ZPG_X"] = 148] = "STY_ZPG_X";
    OP[OP["STY_ABS"] = 140] = "STY_ABS";
    //
    // transfer
    //
    OP[OP["TAX"] = 170] = "TAX";
    OP[OP["TXA"] = 138] = "TXA";
    OP[OP["TAY"] = 168] = "TAY";
    OP[OP["TYA"] = 152] = "TYA";
    OP[OP["TSX"] = 186] = "TSX";
    OP[OP["TXS"] = 154] = "TXS";
    //
    // ORA
    //
    OP[OP["ORA_IMM"] = 9] = "ORA_IMM";
    OP[OP["ORA_ZPG"] = 5] = "ORA_ZPG";
    OP[OP["ORA_ZPG_X"] = 21] = "ORA_ZPG_X";
    OP[OP["ORA_ABS"] = 13] = "ORA_ABS";
    OP[OP["ORA_ABS_X"] = 29] = "ORA_ABS_X";
    OP[OP["ORA_ABS_Y"] = 25] = "ORA_ABS_Y";
    OP[OP["ORA_IND_X"] = 1] = "ORA_IND_X";
    OP[OP["ORA_IND_Y"] = 17] = "ORA_IND_Y";
    //
    // AND
    //
    OP[OP["AND_IMM"] = 41] = "AND_IMM";
    OP[OP["AND_ZPG"] = 37] = "AND_ZPG";
    OP[OP["AND_ZPG_X"] = 53] = "AND_ZPG_X";
    OP[OP["AND_ABS"] = 45] = "AND_ABS";
    OP[OP["AND_ABS_X"] = 61] = "AND_ABS_X";
    OP[OP["AND_ABS_Y"] = 57] = "AND_ABS_Y";
    OP[OP["AND_IND_X"] = 33] = "AND_IND_X";
    OP[OP["AND_IND_Y"] = 49] = "AND_IND_Y";
    //
    // EOR
    //
    OP[OP["EOR_IMM"] = 73] = "EOR_IMM";
    OP[OP["EOR_ZPG"] = 69] = "EOR_ZPG";
    OP[OP["EOR_ZPG_X"] = 85] = "EOR_ZPG_X";
    OP[OP["EOR_ABS"] = 77] = "EOR_ABS";
    OP[OP["EOR_ABS_X"] = 93] = "EOR_ABS_X";
    OP[OP["EOR_ABS_Y"] = 89] = "EOR_ABS_Y";
    OP[OP["EOR_IND_X"] = 65] = "EOR_IND_X";
    OP[OP["EOR_IND_Y"] = 81] = "EOR_IND_Y";
    //
    // BIT
    //
    OP[OP["BIT_ZPG"] = 36] = "BIT_ZPG";
    OP[OP["BIT_ABS"] = 44] = "BIT_ABS";
    //
    // ASL
    //
    OP[OP["ASL_A"] = 10] = "ASL_A";
    OP[OP["ASL_ZPG"] = 6] = "ASL_ZPG";
    OP[OP["ASL_ZPG_X"] = 22] = "ASL_ZPG_X";
    OP[OP["ASL_ABS"] = 14] = "ASL_ABS";
    OP[OP["ASL_ABS_X"] = 30] = "ASL_ABS_X";
    //
    // LSR
    //
    OP[OP["LSR_A"] = 74] = "LSR_A";
    OP[OP["LSR_ZPG"] = 70] = "LSR_ZPG";
    OP[OP["LSR_ZPG_X"] = 86] = "LSR_ZPG_X";
    OP[OP["LSR_ABS"] = 78] = "LSR_ABS";
    OP[OP["LSR_ABS_X"] = 94] = "LSR_ABS_X";
    //
    // ROL
    //
    OP[OP["ROL_A"] = 42] = "ROL_A";
    OP[OP["ROL_ZPG"] = 38] = "ROL_ZPG";
    OP[OP["ROL_ZPG_X"] = 54] = "ROL_ZPG_X";
    OP[OP["ROL_ABS"] = 46] = "ROL_ABS";
    OP[OP["ROL_ABS_X"] = 62] = "ROL_ABS_X";
    //
    // ROR
    //
    OP[OP["ROR_A"] = 106] = "ROR_A";
    OP[OP["ROR_ZPG"] = 102] = "ROR_ZPG";
    OP[OP["ROR_ZPG_X"] = 118] = "ROR_ZPG_X";
    OP[OP["ROR_ABS"] = 110] = "ROR_ABS";
    OP[OP["ROR_ABS_X"] = 126] = "ROR_ABS_X";
    //
    // INC
    //
    OP[OP["INC_ZPG"] = 230] = "INC_ZPG";
    OP[OP["INC_ZPG_X"] = 246] = "INC_ZPG_X";
    OP[OP["INC_ABS"] = 238] = "INC_ABS";
    OP[OP["INC_ABS_X"] = 254] = "INC_ABS_X";
    OP[OP["INX"] = 232] = "INX";
    OP[OP["INY"] = 200] = "INY";
    //
    // DEC
    //
    OP[OP["DEC_ZPG"] = 198] = "DEC_ZPG";
    OP[OP["DEC_ZPG_X"] = 214] = "DEC_ZPG_X";
    OP[OP["DEC_ABS"] = 206] = "DEC_ABS";
    OP[OP["DEC_ABS_X"] = 222] = "DEC_ABS_X";
    OP[OP["DEX"] = 202] = "DEX";
    OP[OP["DEY"] = 136] = "DEY";
    //
    // CMP
    //
    OP[OP["CMP_IMM"] = 201] = "CMP_IMM";
    OP[OP["CMP_ZPG"] = 197] = "CMP_ZPG";
    OP[OP["CMP_ZPG_X"] = 213] = "CMP_ZPG_X";
    OP[OP["CMP_ABS"] = 205] = "CMP_ABS";
    OP[OP["CMP_ABS_X"] = 221] = "CMP_ABS_X";
    OP[OP["CMP_ABS_Y"] = 217] = "CMP_ABS_Y";
    OP[OP["CMP_IND_X"] = 193] = "CMP_IND_X";
    OP[OP["CMP_IND_Y"] = 209] = "CMP_IND_Y";
    OP[OP["CPX_IMM"] = 224] = "CPX_IMM";
    OP[OP["CPX_ZPG"] = 228] = "CPX_ZPG";
    OP[OP["CPX_ABS"] = 236] = "CPX_ABS";
    OP[OP["CPY_IMM"] = 192] = "CPY_IMM";
    OP[OP["CPY_ZPG"] = 196] = "CPY_ZPG";
    OP[OP["CPY_ABS"] = 204] = "CPY_ABS";
    //
    // ADC
    //
    OP[OP["ADC_IMM"] = 105] = "ADC_IMM";
    OP[OP["ADC_ZPG"] = 101] = "ADC_ZPG";
    OP[OP["ADC_ZPG_X"] = 117] = "ADC_ZPG_X";
    OP[OP["ADC_ABS"] = 109] = "ADC_ABS";
    OP[OP["ADC_ABS_X"] = 125] = "ADC_ABS_X";
    OP[OP["ADC_ABS_Y"] = 121] = "ADC_ABS_Y";
    OP[OP["ADC_IND_X"] = 97] = "ADC_IND_X";
    OP[OP["ADC_IND_Y"] = 113] = "ADC_IND_Y";
    //
    // SBC
    //
    OP[OP["SBC_IMM"] = 233] = "SBC_IMM";
    OP[OP["SBC_ZPG"] = 229] = "SBC_ZPG";
    OP[OP["SBC_ZPG_X"] = 245] = "SBC_ZPG_X";
    OP[OP["SBC_ABS"] = 237] = "SBC_ABS";
    OP[OP["SBC_ABS_X"] = 253] = "SBC_ABS_X";
    OP[OP["SBC_ABS_Y"] = 249] = "SBC_ABS_Y";
    OP[OP["SBC_IND_X"] = 225] = "SBC_IND_X";
    OP[OP["SBC_IND_Y"] = 241] = "SBC_IND_Y";
    //
    // status
    //
    OP[OP["CLC"] = 24] = "CLC";
    OP[OP["CLD"] = 216] = "CLD";
    OP[OP["CLI"] = 88] = "CLI";
    OP[OP["CLV"] = 184] = "CLV";
    OP[OP["SEC"] = 56] = "SEC";
    OP[OP["SED"] = 248] = "SED";
    OP[OP["SEI"] = 120] = "SEI";
    //
    // jump
    //
    OP[OP["JMP_ABS"] = 76] = "JMP_ABS";
    OP[OP["JMP_IND"] = 108] = "JMP_IND";
    OP[OP["JSR"] = 32] = "JSR";
    OP[OP["RTI"] = 64] = "RTI";
    OP[OP["RTS"] = 96] = "RTS";
    //
    // branch
    //
    OP[OP["BPL"] = 16] = "BPL";
    OP[OP["BMI"] = 48] = "BMI";
    OP[OP["BVC"] = 80] = "BVC";
    OP[OP["BVS"] = 112] = "BVS";
    OP[OP["BCC"] = 144] = "BCC";
    OP[OP["BNE"] = 208] = "BNE";
    OP[OP["BCS"] = 176] = "BCS";
    OP[OP["BEQ"] = 240] = "BEQ";
})(OP || (OP = {}));
export default OP;
//# sourceMappingURL=opcode.js.map