import OP from './opcode.js'
import ghost6502 from './ghost6502.js'
import {ENTRY, TestCase, MemRange} from './tests/_.js'

import test_bus from './tests/bus.js'
import test_status from './tests/status.js'
import test_system from './tests/system.js'
import test_stack from './tests/stack.js'
import test_load from './tests/load.js'
import test_store from './tests/store.js'
import test_transfer from './tests/transfer.js'
import test_bit from './tests/bit.js'
import test_cmp from './tests/cmp.js'
import test_math from './tests/math.js'
import test_shift from './tests/shift.js'
import test_inc from './tests/inc.js'
import test_br from './tests/br.js'
import test_interrupt from './tests/interrupt.js'


const TEST_CASES : { [name: string] : TestCase[] } = {
  'system:': test_system,
  'status:': test_status,
  'bus': test_bus,
  'stack': test_stack,
  'load': test_load,
  'store': test_store,
  'transfer': test_transfer,
  'bit': test_bit,
  'cmp': test_cmp,
  'math': test_math,
  'shift': test_shift,
  'inc': test_inc,
  'br': test_br,
  'interrupt': test_interrupt,
}

function fillMem(range: MemRange, dst: Uint8Array) {
  for (const [k, arr] of Object.entries(range)) {
    dst.set(arr, +k)
  }
}

ghost6502.bus.mapRead(254, () => {
  console.log('bus read 254')
  return 123
})

ghost6502.bus.mapWrite(254, () => {
  console.log('bus write 254:', ghost6502.bus.data[0])
  ghost6502.mem[10] = ghost6502.bus.data[0]
})

// IO address
const exclude_mem_index: number[] = [
  253, 254,
]

const REGS_DEFAULT = {
  pc: ENTRY, a: 0, x: 0, y: 0, sr: 0, sp: 0xFF,
}
const outMem = new Uint8Array(65536)


function test(tc: TestCase) {
  console.log('run:', tc.name)

  ghost6502.reset()
  fillMem(tc.in.mem, ghost6502.mem)

  outMem.set(ghost6502.mem)

  if (tc.out.mem) {
    fillMem(tc.out.mem, outMem)
  }

  const regs = {
    pc: ghost6502.reg.pc,
    a: ghost6502.reg.a,
    x: ghost6502.reg.x,
    y: ghost6502.reg.y,
    sr: ghost6502.reg.sr,
    sp: ghost6502.reg.sp,
  }
  //
  // reset input regs
  //
  for (const [key, reg] of Object.entries(regs)) {
    // @ts-ignore
    const val = tc.in[key] ?? REGS_DEFAULT[key]
    reg[0] = val
  }

  ghost6502.setLoop(tc.loop || 1)

  if (tc.methods) {
    for (const method of tc.methods) {
      ghost6502[method]()
    }
  } else {
    ghost6502.run()
  }

  for (let i = 0; i < 65536; i++) {
    if (exclude_mem_index.includes(i)) {
      continue
    }
    if (ghost6502.mem[i] === outMem[i]) {
      continue
    }
    console.log('mem index:', i)
    console.log('got:', ghost6502.mem[i])
    console.log('exp:', outMem[i])
    throw ''
  }
  //
  // check output regs
  //
  for (const [key, reg] of Object.entries(regs)) {
    // @ts-ignore
    const exp_val = tc.out[key] ?? tc.in[key] ?? REGS_DEFAULT[key]
    if (exp_val !== reg[0]) {
      console.log('reg:', key)
      console.log('got:', reg[0])
      console.log('exp:', exp_val)
      throw ''
    }
  }
}

for (const [k, v] of Object.entries(TEST_CASES)) {
  console.log(`==== ${k} ====`)
  v.forEach(test)
}