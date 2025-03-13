declare namespace ghost6502 {
  /**
   * Execute an instructions.
   *
   * @description Fetch an opcode from the address pointed to by
   *              reg.pc and execute it.
   *
   * @returns     true if it's BRK, RTI or an illegal instruction.
   */
  function runOp() : boolean

  /**
   * Execute multiple instructions.
   *
   * @description Call runOp `loop` times until it returns true.
   *
   * @returns     -1 if runOp returns true;
   *              ≥0 otherwise. (executed_instructions_number - 1)
   */
  function run() : number

  /**
   * Get the `loop` number. (default 0xFFFFFFFF, i.e. 2³² - 1)
   */
  function getLoop() : number

  /**
   * Set the `loop` number.
   */
  function setLoop(num: number) : void

  /**
   * Restart the CPU.
   *
   * @description 1. Reset reg.*;
   *              2. Load the address at 0xFFFC-0xFFFD into reg.pc;
   *              3. Call the `run` function.
   */
  function reset() : void

  /**
   * Call a non-maskable interrupt.
   *
   * @description 1. Push the context (reg.pc and reg.sr);
   *              2. Load the address at 0xFFFA-0xFFFB into reg.pc;
   *              3. Call the `run` function.
   */
  function nmi() : void

  /**
   * Call a maskable interrupt.
   *
   * @description 1. Exit if the I(nterrupt) flag is set;
   *              2. Push the context (reg.pc and reg.sr);
   *              3. Load the address at 0xFFFE-0xFFFF into reg.pc;
   *              4. Call the `run` function.
   */
  function irq() : void

  const mem: Uint8Array

  namespace reg {
    const a: Uint8Array
    const x: Uint8Array
    const y: Uint8Array
    const sp: Uint8Array
    const sr: Uint8Array
    const pc: Uint16Array
    const pcL: Uint8Array
    const pcH: Uint8Array
  }

  namespace bus {
    const data: Uint8Array

    /**
     * Define the write behavior for the specified address.
     *
     * (The written value is in bus.data)
     */
    function mapWrite(addr: number, callback: () => void) : void

    /**
     * Restore the write behavior for the specified address.
     *
     * (Write to `mem` by default)
     */    
    function unmapWrite(addr: number) : void

    /**
     * Define the read behavior for the specified address.
     *
     * (The callback returns the addressed data)
     */
    function mapRead(addr: number, callback: () => number) : void

    /**
     * Restore the read behavior for the specified address.
     *
     * (Read from `mem` by default)
     */
    function unmapRead(addr: number) : void
  }

  type NumLike = {
    [Symbol.toPrimitive]: (hint: string) => number
  }
  /**
   * Registers can be used as `number` or `string` parameters.
   *
   * @example Math.pow(ghost6502.num.a, ghost6502.num.x)
   *
   * @example alert(ghost6502.num.a)
   */
  namespace num {
    const a: NumLike
    const x: NumLike
    const y: NumLike
    const sr: NumLike
    const sp: NumLike
    const pc: NumLike
    const pcL: NumLike
    const pcH: NumLike
    const busData: NumLike
  }
}

declare module 'ghost6502' {
  export default ghost6502
}