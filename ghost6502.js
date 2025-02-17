function num_like(fn) {
    return {
        [Symbol.toPrimitive]: fn
    };
}
function bind(fn, ctx, ...args) {
    // TODO: reuse same clousures
    return fn.bind(ctx, ...args);
}
function static_bind(fn, ...args) {
    return bind(fn, 0, ...args);
}
function arr_get(arr, idx) {
    // assuming no undefined
    return bind(arr.at, arr, idx);
}
function int_arr_get(arr, idx) {
    return static_bind(Atomics.load, arr, idx);
}
function int_arr_set(arr, idx, val) {
    return static_bind(Atomics.store, arr, idx, val);
}
const reg_add = (r, v) => static_bind(Atomics.add, r, 0, v);
const reg_sub = (r, v) => static_bind(Atomics.sub, r, 0, v);
const reg_or = (r, v) => static_bind(Atomics.or, r, 0, v);
const reg_and = (r, v) => static_bind(Atomics.and, r, 0, v);
const reg_xor = (r, v) => static_bind(Atomics.xor, r, 0, v);
const reg_store = (r, v) => int_arr_set(r, 0, v);
function reg_mov(dst, src) {
    return bind(dst.set, dst, src, 0);
}
function reg_load(reg) {
    return num_like(int_arr_get(reg, 0));
}
function reg_inc(reg) {
    return num_like(reg_add(reg, 1));
}
function imul(x, y) {
    return num_like(static_bind(Math.imul, x, y));
}
const pc = Uint16Array.of(0);
const pc_h = new Uint8Array(pc.buffer, 1, 1);
const pc_l = new Uint8Array(pc.buffer, 0, 1);
const a32 = Uint32Array.of(0);
const a16_h = new Uint16Array(a32.buffer, 2, 1);
const a16 = new Uint16Array(a32.buffer, 0, 1);
const a_h = new Uint8Array(a32.buffer, 1, 1);
const a = new Uint8Array(a32.buffer, 0, 1);
const b16 = Uint16Array.of(0);
const b_h = new Uint8Array(b16.buffer, 1, 1);
const b = new Uint8Array(b16.buffer, 0, 1);
const c16 = Uint16Array.of(0);
const c_h = new Uint8Array(c16.buffer, 1, 1);
const c = new Uint8Array(c16.buffer, 0, 1);
const d16 = Uint16Array.of(0);
const d_h = new Uint8Array(d16.buffer, 1, 1);
const d = new Uint8Array(d16.buffer, 0, 1);
const x16 = Uint16Array.of(0);
const x_h = new Uint8Array(x16.buffer, 1, 1);
const x = new Uint8Array(x16.buffer, 0, 1);
const y16 = Uint16Array.of(0);
const y_h = new Uint8Array(y16.buffer, 1, 1);
const y = new Uint8Array(y16.buffer, 0, 1);
const sp16 = Uint16Array.of(0x01FF);
const sp = new Uint8Array(sp16.buffer, 0, 1);
const sr = Uint8Array.of(48 /* STATUS.DEFAULT */);
const load_pc = reg_load(pc);
const load_pc_l = reg_load(pc_l);
const load_pc_h = reg_load(pc_h);
const load_a = reg_load(a);
const load_b = reg_load(b);
const load_c = reg_load(c);
const load_d = reg_load(d);
const load_x = reg_load(x);
const load_y = reg_load(y);
const load_sp = reg_load(sp);
const load_sr = reg_load(sr);
const load_sp16 = reg_load(sp16);
const load_a32 = reg_load(a32);
const load_a16 = reg_load(a16);
const load_b16 = reg_load(b16);
const load_d16 = reg_load(d16);
const load_x16 = reg_load(x16);
const load_y16 = reg_load(y16);
const set_flag = (flag, reg = sr) => reg_or(reg, flag);
const clr_flag = (flag, reg = sr) => reg_and(reg, ~flag);
const update_sr = (flag_clr, flag_set) => [
    clr_flag(flag_clr),
    set_flag(flag_set),
];
const cache_nz_flag = new Uint8Array(256);
for (let i = 128; i < 256; i++) {
    cache_nz_flag[i] = 128 /* STATUS.N */;
}
cache_nz_flag[0] = 2 /* STATUS.Z */;
function update_nz(val) {
    return update_sr(128 /* STATUS.N */ | 2 /* STATUS.Z */, num_like(int_arr_get(cache_nz_flag, val)));
}
function reg_store_nz(reg, val) {
    return update_nz(num_like(reg_store(reg, val)));
}
const mem = new Uint8Array(65536);
function gen_bus_read_mem_prop(addr) {
    return {
        get: int_arr_get(mem, addr),
        configurable: true,
    };
}
function gen_bus_write_mem_prop(addr) {
    return {
        get: int_arr_set(mem, addr, load_d),
        configurable: true,
    };
}
function create_bus_reader() {
    const props = {};
    for (let addr = 0; addr < 65536; addr++) {
        props[addr] = gen_bus_read_mem_prop(addr);
    }
    return Object.defineProperties([], props);
}
function create_bus_writer() {
    const props = {};
    for (let addr = 0; addr < 65536; addr++) {
        props[addr] = gen_bus_write_mem_prop(addr);
    }
    return Object.defineProperties([], props);
}
const bus_reader = create_bus_reader();
const bus_writer = create_bus_writer();
function write_d_to_addr(addr) {
    return arr_get(bus_writer, addr);
}
function write_addr(addr, reg) {
    return [
        reg_mov(d, reg),
        write_d_to_addr(addr),
    ];
}
function load_addr(addr) {
    return num_like(arr_get(bus_reader, addr));
}
const load_b_ptr = load_addr(load_b);
const load_b16_ptr = load_addr(load_b16);
const load_d_ptr = load_addr(load_d);
const load_sp16_ptr = load_addr(load_sp16);
const fetch_op = load_addr(reg_inc(pc));
const fetch_op_ptr = load_addr(fetch_op);
const read_d_ptr = load_addr(reg_inc(d));
const read_b16_ptr = load_addr(reg_inc(b16));
function push(reg) {
    return [
        ...write_addr(load_sp16, reg),
        reg_sub(sp, 1),
    ];
}
const push_d = [
    write_d_to_addr(load_sp16),
    reg_sub(sp, 1),
];
const fetch_2op_to_b16 = [
    reg_store(b, fetch_op),
    reg_store(b_h, fetch_op),
];
const read_d_ptr_to_b16 = [
    reg_store(b, read_d_ptr),
    reg_store(b_h, load_d_ptr),
];
const halt = static_bind(Number, 0xDEADC0DE);
const BRK = [halt];
const NOP = [];
//
// flag
//
const CLC = [clr_flag(1 /* STATUS.C */)];
const CLD = [clr_flag(8 /* STATUS.D */)];
const CLI = [clr_flag(4 /* STATUS.I */)];
const CLV = [clr_flag(64 /* STATUS.V */)];
const SEC = [set_flag(1 /* STATUS.C */)];
const SED = [set_flag(8 /* STATUS.D */)];
const SEI = [set_flag(4 /* STATUS.I */)];
//
// stack
//
const PHA = [
    ...push(a),
];
const PLA = [
    reg_add(sp, 1),
    reg_store(a, load_sp16_ptr),
    ...reg_store_nz(a, load_a),
];
const PHP = [
    reg_mov(d, sr),
    set_flag(32 /* STATUS._ */ | 16 /* STATUS.B */, d),
    write_d_to_addr(load_sp16),
    reg_sub(sp, 1),
];
const PLP = [
    reg_store(sr, load_sp16_ptr),
    clr_flag(32 /* STATUS._ */ | 16 /* STATUS.B */),
    reg_add(sp, 1),
];
//
// jump
//
const JMP_ABS = [
    ...fetch_2op_to_b16,
    reg_mov(pc, b16),
];
const JMP_IND = [
    ...fetch_2op_to_b16,
    reg_store(pc_l, read_b16_ptr),
    reg_store(pc_h, load_b16_ptr),
];
const JSR = [
    reg_mov(d16, pc),
    reg_add(d16, 2),
    ...push_d,
    reg_mov(d, d_h),
    ...push_d,
    ...fetch_2op_to_b16,
    reg_mov(pc, b16),
];
const RTS = [
    reg_add(sp, 1),
    reg_store(pc_h, load_sp16_ptr),
    reg_add(sp, 1),
    reg_store(pc_l, load_sp16_ptr),
];
const RTI = [
    reg_add(sp, 1),
    reg_store(sr, load_sp16_ptr),
    reg_add(sp, 1),
    reg_store(pc_l, load_sp16_ptr),
    reg_add(sp, 1),
    reg_store(pc_h, load_sp16_ptr),
    halt,
];
//
// branch
//
const int8 = new Int8Array(256);
for (let i = 0; i < 256; i++) {
    int8[i] = i;
}
const fetch_op_i8 = num_like(int_arr_get(int8, fetch_op));
const pc_add_fetch_op_i8 = reg_add(pc, fetch_op_i8);
const pc_add_1 = reg_add(pc, 1);
function branch_impl(flag, is_set) {
    const props = {};
    for (let i = 0; i < 256; i++) {
        const on = !!(i & flag) === is_set;
        const fn = on ? pc_add_fetch_op_i8 : pc_add_1;
        props[i] = { get: fn };
    }
    const triggler = Object.defineProperties([], props);
    return [
        arr_get(triggler, load_sr),
    ];
}
const BCS = branch_impl(1 /* STATUS.C */, true);
const BCC = branch_impl(1 /* STATUS.C */, false);
const BEQ = branch_impl(2 /* STATUS.Z */, true);
const BNE = branch_impl(2 /* STATUS.Z */, false);
const BVS = branch_impl(64 /* STATUS.V */, true);
const BVC = branch_impl(64 /* STATUS.V */, false);
const BMI = branch_impl(128 /* STATUS.N */, true);
const BPL = branch_impl(128 /* STATUS.N */, false);
class AddrMode {
    // calculate the address of the operand and save it to b16
    calc_addr() {
        return [];
    }
    // for STA, STX, STY
    get_store_addr() {
        throw 'not implemented';
    }
    get_operand() {
        throw 'not implemented';
    }
    // `save_operand_to_d` and `get_operand_addr` are used in pairs
    save_operand_to_d() {
        throw 'not implemented';
    }
    get_operand_addr() {
        throw 'not implemented';
    }
}
class AddrModeImm extends AddrMode {
    get_operand() {
        return fetch_op;
    }
}
class AddrModeZpg extends AddrMode {
    get_store_addr() {
        return fetch_op;
    }
    get_operand() {
        return fetch_op_ptr;
    }
    save_operand_to_d() {
        return [
            reg_store(b, fetch_op),
            reg_store(d, load_b_ptr),
        ];
    }
    get_operand_addr() {
        return load_b;
    }
}
class AddrModeZpgX extends AddrModeZpg {
    calc_addr() {
        return [
            reg_store(b, fetch_op),
            reg_add(b, load_x),
        ];
    }
    get_store_addr() {
        return load_b;
    }
    get_operand() {
        return load_b_ptr;
    }
    save_operand_to_d() {
        return [
            ...this.calc_addr(),
            reg_store(d, load_b_ptr),
        ];
    }
}
class AddrModeZpgY extends AddrModeZpgX {
    calc_addr() {
        return [
            reg_store(b16, fetch_op),
            reg_add(b16, load_y),
        ];
    }
}
class AddrModeAbs extends AddrMode {
    calc_addr() {
        return [
            ...fetch_2op_to_b16,
        ];
    }
    get_store_addr() {
        return load_b16;
    }
    get_operand() {
        return load_b16_ptr;
    }
    save_operand_to_d() {
        return [
            ...this.calc_addr(),
            reg_store(d, load_b16_ptr),
        ];
    }
    get_operand_addr() {
        return load_b16;
    }
}
class AddrModeAbsX extends AddrModeAbs {
    calc_addr() {
        return [
            ...super.calc_addr(),
            reg_add(b16, load_x),
        ];
    }
}
class AddrModeAbsY extends AddrModeAbs {
    calc_addr() {
        return [
            ...super.calc_addr(),
            reg_add(b16, load_y),
        ];
    }
}
class AddrModeIndX extends AddrModeAbs {
    calc_addr() {
        return [
            reg_store(d, fetch_op),
            reg_add(d, load_x),
            ...read_d_ptr_to_b16,
        ];
    }
}
class AddrModeIndY extends AddrModeAbs {
    calc_addr() {
        return [
            reg_store(d, fetch_op),
            ...read_d_ptr_to_b16,
            reg_add(b16, load_y),
        ];
    }
}
const IMM = new AddrModeImm();
const ZPG = new AddrModeZpg();
const ZPG_X = new AddrModeZpgX();
const ZPG_Y = new AddrModeZpgY();
const ABS = new AddrModeAbs();
const ABS_X = new AddrModeAbsX();
const ABS_Y = new AddrModeAbsY();
const IND_X = new AddrModeIndX();
const IND_Y = new AddrModeIndY();
const load_reg_impl = (reg, mode) => [
    ...mode.calc_addr(),
    ...reg_store_nz(reg, mode.get_operand()),
];
const LDA = (mode) => load_reg_impl(a, mode);
const LDX = (mode) => load_reg_impl(x, mode);
const LDY = (mode) => load_reg_impl(y, mode);
const store_reg_impl = (reg, mode) => [
    // TODO: optimized to write_addr_d()
    ...mode.calc_addr(),
    ...write_addr(mode.get_store_addr(), reg),
];
const STA = (mode) => store_reg_impl(a, mode);
const STX = (mode) => store_reg_impl(x, mode);
const STY = (mode) => store_reg_impl(y, mode);
const TAX = reg_store_nz(x, load_a);
const TXA = reg_store_nz(a, load_x);
const TAY = reg_store_nz(y, load_a);
const TYA = reg_store_nz(a, load_y);
const TSX = reg_store_nz(x, load_sp);
const TXS = [reg_mov(sp, x)];
const inc_impl = (mode, n) => [
    ...mode.save_operand_to_d(),
    reg_add(d, n),
    ...update_nz(num_like(write_d_to_addr(mode.get_operand_addr()))),
];
const INC = (mode) => inc_impl(mode, +1);
const DEC = (mode) => inc_impl(mode, -1);
const inx_impl = (reg, load_reg, n) => [
    reg_add(reg, n),
    ...reg_store_nz(reg, load_reg),
];
const INX = inx_impl(x, load_x, +1);
const INY = inx_impl(y, load_y, +1);
const DEX = inx_impl(x, load_x, -1);
const DEY = inx_impl(y, load_y, -1);
//
// Compare (CMP, CPX, CPY)
//
const cache_cmp_flag = new Uint8Array(65536);
for (let m = 0; m < 256; m++) {
    for (let a = 0; a < 256; a++) {
        const diff = a - m;
        const sr_c = diff >= 0 ? 1 /* STATUS.C */ : 0;
        const sr_n = diff > 127 ? 128 /* STATUS.N */ : 0;
        const sr_z = diff === 0 ? 2 /* STATUS.Z */ : 0;
        cache_cmp_flag[m << 8 | a] = sr_c | sr_n | sr_z;
    }
}
function cmp_impl(load_reg16, reg_h, mode) {
    return [
        ...mode.calc_addr(),
        reg_store(reg_h, mode.get_operand()),
        ...update_sr(128 /* STATUS.N */ | 2 /* STATUS.Z */ | 1 /* STATUS.C */, num_like(int_arr_get(cache_cmp_flag, load_reg16)))
    ];
}
const CMP = (mode) => cmp_impl(load_a16, a_h, mode);
const CPX = (mode) => cmp_impl(load_x16, x_h, mode);
const CPY = (mode) => cmp_impl(load_y16, y_h, mode);
//
// Bitwise (ORA, AND, EOR, BIT)
//
function bitwise_impl(fn, mode) {
    return [
        ...mode.calc_addr(),
        fn(a, mode.get_operand()),
        ...update_nz(load_a),
    ];
}
const ORA = (mode) => bitwise_impl(reg_or, mode);
const AND = (mode) => bitwise_impl(reg_and, mode);
const EOR = (mode) => bitwise_impl(reg_xor, mode);
const cache_bit_flag = new Uint8Array(65536);
for (let m = 0; m < 256; m++) {
    for (let a = 0; a < 256; a++) {
        const zero = (a & m) ? 0 : 2 /* STATUS.Z */;
        const m7m6 = m & 0b1100_0000;
        cache_bit_flag[m << 8 | a] = m7m6 | zero;
    }
}
function BIT(mode) {
    return [
        ...mode.calc_addr(),
        reg_store(a_h, mode.get_operand()),
        ...update_sr(128 /* STATUS.N */ | 64 /* STATUS.V */ | 2 /* STATUS.Z */, num_like(int_arr_get(cache_bit_flag, load_a16))),
    ];
}
//
// Shift (ASL, LSR)
//
const cache_shl_flag = new Uint8Array(512);
for (let i = 0; i < 512; i++) {
    const sr_c = i > 255 ? 1 /* STATUS.C */ : 0;
    const sr_n = i & 128 ? 128 /* STATUS.N */ : 0;
    const sr_z = i & 255 ? 0 : 2 /* STATUS.Z */;
    cache_shl_flag[i] = sr_c | sr_n | sr_z;
}
const shl_reg = (reg, load_reg) => update_sr(128 /* STATUS.N */ | 2 /* STATUS.Z */ | 1 /* STATUS.C */, num_like(int_arr_get(cache_shl_flag, num_like(reg_store(reg, imul(load_reg, 2))))));
const cache_shr_flag = new Uint8Array(512);
const cache_shr_result = new Uint8Array(512);
for (let i = 0; i < 512; i++) {
    const sr_c = i & 1 ? 1 /* STATUS.C */ : 0;
    const sr_n = i > 255 ? 128 /* STATUS.N */ : 0;
    const sr_z = i < 2 ? 2 /* STATUS.Z */ : 0;
    cache_shr_flag[i] = sr_c | sr_n | sr_z;
    cache_shr_result[i] = i >> 1;
}
const shr_reg = (reg, load_reg) => [
    ...update_sr(128 /* STATUS.N */ | 2 /* STATUS.Z */ | 1 /* STATUS.C */, num_like(int_arr_get(cache_shr_flag, load_reg))),
    reg_store(reg, num_like(int_arr_get(cache_shr_result, load_reg))),
];
const shift_impl = (fn, mode) => [
    ...mode.save_operand_to_d(),
    ...fn(d, load_d),
    write_d_to_addr(mode.get_operand_addr()),
];
const ASL = (mode) => shift_impl(shl_reg, mode);
const LSR = (mode) => shift_impl(shr_reg, mode);
const ASL_A = shl_reg(a, load_a);
const LSR_A = shr_reg(a, load_a);
//
// Rotate (ROL, ROR)
//
const ROL_A = [
    reg_mov(c, sr),
    reg_and(c, 1),
    ...shl_reg(a, load_a),
    reg_or(a, load_c),
];
const ROL = (mode) => [
    reg_mov(c, sr),
    reg_and(c, 1),
    ...mode.save_operand_to_d(),
    ...shl_reg(d, load_d),
    reg_or(d, load_c),
    write_d_to_addr(mode.get_operand_addr()),
];
const ROR_A = [
    reg_mov(b_h, sr),
    reg_and(b_h, 1 /* STATUS.C */),
    reg_mov(b, a),
    ...shr_reg(a, load_b16),
];
const ROR = (mode) => [
    reg_mov(d_h, sr),
    reg_and(d_h, 1 /* STATUS.C */),
    ...mode.save_operand_to_d(),
    ...shr_reg(d, load_d16),
    write_d_to_addr(mode.get_operand_addr()),
];
//
// Math (ADC, SBC)
//
const cache_adc_flag = new Uint8Array(2 * 256 * 256);
const cache_adc_result = new Uint8Array(2 * 256 * 256);
const cache_sbc_flag = new Uint8Array(2 * 256 * 256);
const cache_sbc_result = new Uint8Array(2 * 256 * 256);
for (let c = 0; c <= 1; c++) {
    for (let m = 0; m < 256; m++) {
        for (let a = 0; a < 256; a++) {
            const pos = c << 16 | m << 8 | a;
            // ADC
            const sum = a + m + c;
            const sum_i = int8[a] + int8[m] + c;
            const sum_sr_c = sum > 255 ? 1 /* STATUS.C */ : 0;
            const sum_sr_n = sum & 128 ? 128 /* STATUS.N */ : 0;
            const sum_sr_z = sum === 0 ? 2 /* STATUS.Z */ : 0;
            const sum_sr_v = (sum_i > 127 || sum_i < -128) ? 64 /* STATUS.V */ : 0;
            cache_adc_flag[pos] = sum_sr_c | sum_sr_n | sum_sr_z | sum_sr_v;
            cache_adc_result[pos] = sum;
            // SBC
            const diff = a - m - (1 - c);
            const diff_i = int8[a] - int8[m] - (1 - c);
            const diff_sr_c = diff < 0 ? 0 : 1 /* STATUS.C */;
            const diff_sr_z = diff & 255 ? 0 : 2 /* STATUS.Z */;
            const diff_sr_n = diff & 128 ? 128 /* STATUS.N */ : 0;
            const diff_sr_v = (diff_i > 127 || diff_i < -128) ? 64 /* STATUS.V */ : 0;
            cache_sbc_result[pos] = diff;
            cache_sbc_flag[pos] = diff_sr_c | diff_sr_n | diff_sr_z | diff_sr_v;
        }
    }
}
function adc_sbc_impl(mode, is_adc) {
    const flags = is_adc ? cache_adc_flag : cache_sbc_flag;
    const results = is_adc ? cache_adc_result : cache_sbc_result;
    return [
        reg_mov(a16_h, sr),
        reg_and(a16_h, 1),
        ...mode.calc_addr(),
        reg_store(a_h, mode.get_operand()),
        ...update_sr(1 /* STATUS.C */ | 128 /* STATUS.N */ | 2 /* STATUS.Z */ | 64 /* STATUS.V */, num_like(int_arr_get(flags, load_a32))),
        reg_store(a, num_like(int_arr_get(results, load_a32))),
    ];
}
const ADC = (mode) => adc_sbc_impl(mode, true);
const SBC = (mode) => adc_sbc_impl(mode, false);
//
// https://www.masswerk.at/6502/6502_instruction_set.html
//
const OP_TABLE = [
    /*       -0      , -1        , -2      ,, -4        , -5        , -6        ,, -8 , -9        , -A   ,, -C        , -D        , -E        */
    /* 0- */ BRK, ORA(IND_X), , , , ORA(ZPG), ASL(ZPG), , PHP, ORA(IMM), ASL_A, , , ORA(ABS), ASL(ABS), ,
    /* 1- */ BPL, ORA(IND_Y), , , , ORA(ZPG_X), ASL(ZPG_X), , CLC, ORA(ABS_Y), , , , ORA(ABS_X), ASL(ABS_X), ,
    /* 2- */ JSR, AND(IND_X), , , BIT(ZPG), AND(ZPG), ROL(ZPG), , PLP, AND(IMM), ROL_A, , BIT(ABS), AND(ABS), ROL(ABS), ,
    /* 3- */ BMI, AND(IND_Y), , , , AND(ZPG_X), ROL(ZPG_X), , SEC, AND(ABS_Y), , , , AND(ABS_X), ROL(ABS_X), ,
    /* 4- */ RTI, EOR(IND_X), , , , EOR(ZPG), LSR(ZPG), , PHA, EOR(IMM), LSR_A, , JMP_ABS, EOR(ABS), LSR(ABS), ,
    /* 5- */ BVC, EOR(IND_Y), , , , EOR(ZPG_X), LSR(ZPG_X), , CLI, EOR(ABS_Y), , , , EOR(ABS_X), LSR(ABS_X), ,
    /* 6- */ RTS, ADC(IND_X), , , , ADC(ZPG), ROR(ZPG), , PLA, ADC(IMM), ROR_A, , JMP_IND, ADC(ABS), ROR(ABS), ,
    /* 7- */ BVS, ADC(IND_Y), , , , ADC(ZPG_X), ROR(ZPG_X), , SEI, ADC(ABS_Y), , , , ADC(ABS_X), ROR(ABS_X), ,
    /* 8- */ ,
    STA(IND_X), , , STY(ZPG), STA(ZPG), STX(ZPG), , DEY, , TXA, , STY(ABS), STA(ABS), STX(ABS), ,
    /* 9- */ BCC, STA(IND_Y), , , STY(ZPG_X), STA(ZPG_X), STX(ZPG_Y), , TYA, STA(ABS_Y), TXS, , , STA(ABS_X), , ,
    /* A- */ LDY(IMM), LDA(IND_X), LDX(IMM), , LDY(ZPG), LDA(ZPG), LDX(ZPG), , TAY, LDA(IMM), TAX, , LDY(ABS), LDA(ABS), LDX(ABS), ,
    /* B- */ BCS, LDA(IND_Y), , , LDY(ZPG_X), LDA(ZPG_X), LDX(ZPG_Y), , CLV, LDA(ABS_Y), TSX, , LDY(ABS_X), LDA(ABS_X), LDX(ABS_Y), ,
    /* C- */ CPY(IMM), CMP(IND_X), , , CPY(ZPG), CMP(ZPG), DEC(ZPG), , INY, CMP(IMM), DEX, , CPY(ABS), CMP(ABS), DEC(ABS), ,
    /* D- */ BNE, CMP(IND_Y), , , , CMP(ZPG_X), DEC(ZPG_X), , CLD, CMP(ABS_Y), , , , CMP(ABS_X), DEC(ABS_X), ,
    /* E- */ CPX(IMM), SBC(IND_X), , , CPX(ZPG), SBC(ZPG), INC(ZPG), , INX, SBC(IMM), NOP, , CPX(ABS), SBC(ABS), INC(ABS), ,
    /* F- */ BEQ, SBC(IND_Y), , , , SBC(ZPG_X), INC(ZPG_X), , SED, SBC(ABS_Y), , , , SBC(ABS_X), INC(ABS_X), ,
];
function illegal_op(opcode) {
    const hex = opcode.toString(16).padStart(2, '0');
    return [
        bind(console.warn, console, 'invalid op: 0x' + hex),
        halt,
    ];
}
function bundle_uops(uops) {
    const props = {};
    for (let i = 0; i < uops.length; i++) {
        props[i] = { get: uops[i] };
    }
    const blk = Object.defineProperties([], props);
    return bind(blk.includes, blk, halt());
}
function make_op_decoder() {
    const props = {};
    for (let i = 0; i < OP_TABLE.length; i++) {
        const uops = OP_TABLE[i] || illegal_op(i);
        props[i] = { get: bundle_uops(uops) };
    }
    return Object.defineProperties([], props);
}
// read op_decoder[i] to trigger OP_TABLE[i]
const op_decoder = make_op_decoder();
// call run_op to read op_decoder[bus_reader[pc++]]
const run_op = arr_get(op_decoder, fetch_op);
const loop = Array(0xFFFFFFFF);
const run = bind(loop.findIndex, loop, run_op);
const LUT_EXIT_IF_FLAG_I = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
    if (i & 4 /* STATUS.I */) {
        LUT_EXIT_IF_FLAG_I[i] = halt();
    }
}
const run_irq = bundle_uops([
    int_arr_get(LUT_EXIT_IF_FLAG_I, load_sr),
    ...push(pc_h),
    ...push(pc_l),
    ...push(sr),
    set_flag(4 /* STATUS.I */),
    reg_store(pc_l, load_addr(0xFFFE)),
    reg_store(pc_h, load_addr(0xFFFF)),
    run,
]);
const run_nmi = bundle_uops([
    ...push(pc_h),
    ...push(pc_l),
    ...push(sr),
    reg_store(pc_l, load_addr(0xFFFA)),
    reg_store(pc_h, load_addr(0xFFFB)),
    run,
]);
const reset = bundle_uops([
    reg_store(sr, 48 /* STATUS.DEFAULT */),
    reg_store(sp, 0xFF),
    reg_store(a, 0),
    reg_store(x, 0),
    reg_store(y, 0),
    reg_store(pc_l, load_addr(0xFFFC)),
    reg_store(pc_h, load_addr(0xFFFD)),
    run,
]);
function map_bus_read(addr, callback) {
    Object.defineProperty(bus_reader, addr, {
        get: callback,
        configurable: true,
    });
}
function map_bus_write(addr, callback) {
    Object.defineProperty(bus_writer, addr, {
        get: callback,
        configurable: true,
    });
}
function unmap_bus_read(addr) {
    const prop = gen_bus_read_mem_prop(addr);
    Object.defineProperty(bus_reader, addr, prop);
}
function unmap_bus_write(addr) {
    const prop = gen_bus_write_mem_prop(addr);
    Object.defineProperty(bus_writer, addr, prop);
}
export default {
    mem,
    reg: {
        a, x, y, sp, sr, pc, pcL: pc_l, pcH: pc_h,
    },
    bus: {
        data: d,
        mapRead: map_bus_read,
        mapWrite: map_bus_write,
        unmapRead: unmap_bus_read,
        unmapWrite: unmap_bus_write,
    },
    num: {
        a: load_a,
        x: load_x,
        y: load_y,
        sr: load_sr,
        sp: load_sp,
        pc: load_pc,
        pcL: load_pc_l,
        pcH: load_pc_h,
        busData: load_d,
    },
    runOp: run_op,
    run,
    reset,
    irq: run_irq,
    nmi: run_nmi,
    getLoop: static_bind(Reflect.get, loop, 'length'),
    setLoop: static_bind(Reflect.set, loop, 'length'),
};
//# sourceMappingURL=ghost6502.js.map