import ghost6502 from './ghost6502.js'

const ADDR_OUT_SCREEN = 0x0200
const ADDR_IN_MOUSE_BTN = 0xFB
const ADDR_IN_MOUSE_X = 0xFC
const ADDR_IN_MOUSE_Y = 0xFD
const ADDR_IN_RAND = 0xFE
const ADDR_IN_KEY = 0xFF

const FPS = 60

const methodToFn = Date.bind.bind(Date.call)
const bindApply = Date.bind.bind(Date.apply)

function fnBind(fn, ...args) {
  return fn.bind(0, ...args)
}
function globalBind(fn, ...args) {
  return fn.bind(window, ...args)
}
function objSet(...args) {
  return fnBind(Reflect.set, ...args)
}
function objGet(...args) {
  return fnBind(Reflect.get, ...args)
}
function arrGet(arr, ...args) {
  return arr.at.bind(arr, ...args)
}
function typedArrGet(arr, ...args) {
  return fnBind(Atomics.load, arr, ...args)
}
function typedArrSet(arr, ...args) {
  return fnBind(Atomics.store, arr, ...args)
}
function getGetter(cls, name) {
  return Object.getOwnPropertyDescriptor(cls.prototype, name).get
}

function genBlock(ops) {
  const values = ops.map(fn => {
    return {valueOf: fn}
  })
  const fn = ops.length === 2 ? Math.imul : Math.max
  return fnBind(fn, ...values)
}

const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext('2d')
const imgData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height)
const imgU32 = new Uint32Array(imgData.data.buffer)
const updateCanvas = canvasCtx.putImageData.bind(canvasCtx, imgData, 0, 0)


const PALETTE = [
  0xFF000000, 0xFFFFFFFF, 0xFF000088, 0xFFEEFFAA,
  0xFFCC44CC, 0xFF55CC00, 0xFFAA0000, 0xFF77EEEE,
  0xFF5588DD, 0xFF004466, 0xFF7777FF, 0xFF333333,
  0xFF777777, 0xFF66FFAA, 0xFFFF8800, 0xFFBBBBBB,
]
const palette = new Uint32Array(256)

for (let i = 0; i < 256; i++) {
  palette[i] = PALETTE[i % 16]
}
const getPixelByBusData = typedArrGet(palette, ghost6502.num.busData)

function setupScreenBus(i) {
  const writePixel = typedArrSet(imgU32, i, {
    valueOf: getPixelByBusData
  })
  // 👆🏻 equivalent to:
  //
  // const writePixel = () => {
  //   imgU32[i] = palette[+ghost6502.num.busData]
  // }
  ghost6502.bus.mapWrite(ADDR_OUT_SCREEN + i, writePixel)
}

for (let i = 0; i < 32 * 32; i++) {
  setupScreenBus(i)
}


const randF32 = new Float32Array(1)
const randU8 = new Uint8Array(randF32.buffer)

const setRandF32 = objSet(randF32, 0, {
  valueOf: Math.random
})
const getRandU8 = typedArrGet(randU8, {
  // setRandF32 (i.e. Reflect.set) returns true
  // +true == 1
  valueOf: setRandF32
})
//
// 👆🏻 equivalent to:
//
// const getRandU8 = () => {
//   randF32[0] = Math.random()
//   return randU8[1]
// }
ghost6502.bus.mapRead(ADDR_IN_RAND, getRandU8)


const KEY_MAP = {
  'Enter': 13,
  'Escape': 27,
  'Space': 32,
  'ArrowLeft': 37,
  'ArrowUp': 38,
  'ArrowRight': 39,
  'ArrowDown': 40,
}
for (const s of '0123456789') {
  KEY_MAP['Digit' + s] = s.charCodeAt(0)
}
for (const s of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  KEY_MAP['Key' + s] = s.toLowerCase().charCodeAt(0)
}

//
// see section 7.1
//
const getCodeByKeyEvent = methodToFn(getGetter(KeyboardEvent, 'code'))
const keySlot = []

Object.defineProperty(keySlot, 1, {
  set: typedArrSet(ghost6502.mem, ADDR_IN_KEY, {
    valueOf: objGet(KEY_MAP, {
      toString: bindApply(getCodeByKeyEvent, 0, keySlot)
    })
  })
})
window.onkeydown = keySlot.fill.bind(keySlot)
//
// 👆🏻 equivalent to:
//
// window.onkeydown = (e) => {
//   ghost6502.mem[ADDR_IN_KEY] = KEY_MAP[e.code]
// }

const clearKey = typedArrSet(ghost6502.mem, ADDR_IN_KEY, 0)
window.onkeyup = clearKey


const DIV8 = new Uint8Array(260)
for (let i = 0; i < DIV8.length; i++) {
  DIV8[i] = Math.min(i, 255) / 8
}
const mouseMoveSlot = []
const getXByMouseEvent = methodToFn(getGetter(MouseEvent, 'offsetX'))
const getYByMouseEvent = methodToFn(getGetter(MouseEvent, 'offsetY'))

const writeMouseMoveX = typedArrSet(ghost6502.mem, ADDR_IN_MOUSE_X, {
  valueOf: typedArrGet(DIV8, {
    valueOf: bindApply(getXByMouseEvent, 0, mouseMoveSlot)
  })
})
const writeMouseMoveY = typedArrSet(ghost6502.mem, ADDR_IN_MOUSE_Y, {
  valueOf: typedArrGet(DIV8, {
    valueOf: bindApply(getYByMouseEvent, 0, mouseMoveSlot)
  })
})
const writeMousePos = genBlock([writeMouseMoveX, writeMouseMoveY])

Object.defineProperty(mouseMoveSlot, 1, {
  set: writeMousePos
})
canvas.onmousemove = mouseMoveSlot.fill.bind(mouseMoveSlot)
//
// 👆🏻 equivalent to:
//
// canvas.onmousemove = (e) => {
//   ghost6502.mem[ADDR_IN_MOUSE_X] = e.offsetX / 8
//   ghost6502.mem[ADDR_IN_MOUSE_Y] = e.offsetY / 8
// }

canvas.onmouseup = typedArrSet(ghost6502.mem, ADDR_IN_MOUSE_BTN, 0)
canvas.onmousedown = typedArrSet(ghost6502.mem, ADDR_IN_MOUSE_BTN, 1)

canvas.oncontextmenu = [].at.bind([0, 0, false], {
  valueOf: typedArrSet(ghost6502.mem, ADDR_IN_MOUSE_BTN, 2)
})


const hexTable = []
const binTable = []

for (let i = 0; i < 256; i++) {
  hexTable[i] = i.toString(16).padStart(2, '0').toUpperCase()
  binTable[i] = i.toString( 2).padStart(8, '0').toUpperCase()
}

function numToHex(num) {
  return {
    toString: arrGet(hexTable, num)
  }
}
function numToBin(num) {
  return {
    toString: arrGet(binTable, num),
  }
}
const formatRegs = ''.concat.bind(
  ' A=$',  numToHex(ghost6502.num.a),
  ' X=$',  numToHex(ghost6502.num.x),
  ' Y=$',  numToHex(ghost6502.num.y),
  ' SP=$', numToHex(ghost6502.num.sp),
  ' PC=$', numToHex(ghost6502.num.pcH),
           numToHex(ghost6502.num.pcL), '\n' +
  ' NV-BDIZC' + '\n' +
  ' ',     numToBin(ghost6502.num.sr),
)

const printRegs = objSet(txtRegs, 'textContent', {
  toString: formatRegs
})
printRegs()

const txtRegsCss = txtRegs.classList
const showTxtRegsPaused = txtRegsCss.add.bind(txtRegsCss, 'paused')
const showTxtRegsResume = txtRegsCss.remove.bind(txtRegsCss, 'paused')


const timerId = Uint32Array.of(0)
const stopTimer = genBlock([
  globalBind(clearInterval, timerId),
  showTxtRegsPaused,
])

const onTimer = genBlock([
  ghost6502.irq,
  updateCanvas,
  printRegs,
])
// 👆🏻 equivalent to:
//
// function onTimer() {
//   if (!runLoop()) {
//     stopTimer()
//   }
//   updateCanvas()
//   printRegs()
// }

const startTimer = genBlock([
  typedArrSet(timerId, 0, {
    valueOf: globalBind(setInterval, onTimer, 1000 / FPS),
  }),
  showTxtRegsResume,
])

const resetTimer = genBlock([
  stopTimer,
  startTimer,
])

btnPause.onclick = stopTimer
btnResume.onclick = resetTimer

// 
// for demo purposes, the following code does not use built-in functions
// 
window.addEventListener('error', e => {
  txtErr.textContent = e.message
})

selectDemo.oninput = async () => {
  const res = await fetch('demos/' + selectDemo.selectedOptions[0].value)
  txtHexDump.value = await res.text()
  selectDemo.blur()
  btnReset.onclick()
}
selectDemo.oninput()


btnSnapshot.onclick = () => {
  const state = {
    a: ghost6502.reg.a[0],
    x: ghost6502.reg.x[0],
    y: ghost6502.reg.y[0],
    pc: ghost6502.reg.pc[0],
    sp: ghost6502.reg.sp[0],
    sr: ghost6502.reg.sr[0],
    mem: Array.from(ghost6502.mem),
    screen: Array.from(imgU32),
  }
  const format = JSON.stringify(state)
  const blob = new Blob([format], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  open(url)
}

btnRestore.onclick = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.oninput = () => {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const state = JSON.parse(reader.result)
      state && restore(state)
    }
    reader.readAsText(file)
  }
  input.click()
}

function restore(state) {
  if (!Array.isArray(state.mem) || !Array.isArray(state.screen)) {
    return
  }
  ghost6502.reg.a.fill(state.a)
  ghost6502.reg.x.fill(state.x)
  ghost6502.reg.y.fill(state.y)
  ghost6502.reg.pc.fill(state.pc)
  ghost6502.reg.sp.fill(state.sp)
  ghost6502.reg.sr.fill(state.sr)
  ghost6502.mem.set(state.mem)
  imgU32.set(state.screen)
  updateCanvas()
}


const REG_BLANK_ROW = /^([0-9a-f]{4}):( 00)+$\n/gim

txtHexDump.oninput = () => {
  if (REG_BLANK_ROW.test(txtHexDump.value)) {
    txtHexDump.value = txtHexDump.value.replace(REG_BLANK_ROW, '')
  }
}

const REG_HEXDUMP = /^([0-9a-f]{4}):\s*?((?: [0-9a-f]{2})+)/gim
// extract:           ($addr)           ( 00 01 02 ...)

btnReset.onclick = () => {
  imgU32.fill(0)
  ghost6502.mem.fill(0)

  for (const m of txtHexDump.value.matchAll(REG_HEXDUMP)) {
    const addr = parseInt(m[1], 16)
    const bytes = m[2]
      .trim()
      .split(' ')
      .map(v => parseInt(v, 16))

    ghost6502.mem.set(bytes, addr)
  }
  ghost6502.reset()

  window.addEventListener('message', resetTimer, {once: true})
  window.postMessage('', '*')
}

// debug
window.ghost6502 = ghost6502