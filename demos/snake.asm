;
; Source: https://skilldrick.github.io/easy6502/#snake
;
; Changes:
;   1. frame loop to IRQ
;   2. variable initialization to .org
;   3. constant definition style
;
; Assembler: https://www.masswerk.at/6502/assembler.html
;
FRAMES_PRE_LOOP = $06
frameCount      = $1000

appleL          = $00 ; screen location of apple, low byte
appleH          = $01 ; screen location of apple, high byte
snakeHeadL      = $10 ; screen location of snake head, low byte
snakeHeadH      = $11 ; screen location of snake head, high byte
snakeBodyStart  = $12 ; start of snake body byte pairs
snakeDirection  = $02 ; direction (possible values are below)
snakeLength     = $03 ; snake length, in bytes

; Directions (each using a separate bit)
movingUp        = 1
movingRight     = 2
movingDown      = 4
movingLeft      = 8

; ASCII values of keys controlling the snake
ASCII_w         = $77
ASCII_a         = $61
ASCII_s         = $73
ASCII_d         = $64

; System variables
sysRandom       = $fe
sysLastKey      = $ff


.org snakeDirection   ; start direction
  .byte movingRight

.org snakeLength      ; start length (2 segments)
  .byte #4

.org snakeHeadL
  .byte #$11

.org snakeBodyStart
  .byte #$10

.org $14              ; body segment 1
  .byte #$0f

.org snakeHeadH
  .byte #$04
.org $13              ; body segment 1
  .byte #$04
.org $15              ; body segment 2
  .byte #$04

.org frameCount
  .byte #1


.org $8000            ; reset entry
  jsr generateApplePosition
  brk

generateApplePosition:
  ;load a new random byte into $00
  lda sysRandom
  sta appleL

  ;load a new random number from 2 to 5 into $01
  lda sysRandom
  and #$03 ;mask out lowest 2 bits
  clc
  adc #2
  sta appleH

  rts


.org $9000            ; IRQ
  jsr readKeys

  dec frameCount      ; skip some frames to prevent
  bne loopExit        ; the game from running too fast
  lda #FRAMES_PRE_LOOP
  sta frameCount

  jsr checkCollision
  jsr updateSnake
  jsr drawApple
  jsr drawSnake
loopExit:
  rti


readKeys:
  lda sysLastKey
  cmp #ASCII_w
  beq upKey
  cmp #ASCII_d
  beq rightKey
  cmp #ASCII_s
  beq downKey
  cmp #ASCII_a
  beq leftKey
  rts
upKey:
  lda #movingDown
  bit snakeDirection
  bne illegalMove

  lda #movingUp
  sta snakeDirection
  rts
rightKey:
  lda #movingLeft
  bit snakeDirection
  bne illegalMove

  lda #movingRight
  sta snakeDirection
  rts
downKey:
  lda #movingUp
  bit snakeDirection
  bne illegalMove

  lda #movingDown
  sta snakeDirection
  rts
leftKey:
  lda #movingRight
  bit snakeDirection
  bne illegalMove

  lda #movingLeft
  sta snakeDirection
  rts
illegalMove:
  rts


checkCollision:
  jsr checkAppleCollision
  jsr checkSnakeCollision
  rts


checkAppleCollision:
  lda appleL
  cmp snakeHeadL
  bne doneCheckingAppleCollision
  lda appleH
  cmp snakeHeadH
  bne doneCheckingAppleCollision

  ;eat apple
  inc snakeLength
  inc snakeLength ;increase length
  jsr generateApplePosition
doneCheckingAppleCollision:
  rts


checkSnakeCollision:
  ldx #2 ;start with second segment
snakeCollisionLoop:
  lda snakeHeadL,x
  cmp snakeHeadL
  bne continueCollisionLoop

maybeCollided:
  lda snakeHeadH,x
  cmp snakeHeadH
  beq didCollide

continueCollisionLoop:
  inx
  inx
  cpx snakeLength          ;got to last section with no collision
  beq didntCollide
  jmp snakeCollisionLoop

didCollide:
  jmp gameOver
didntCollide:
  rts


updateSnake:
  ldx snakeLength
  dex
  txa
updateloop:
  lda snakeHeadL,x
  sta snakeBodyStart,x
  dex
  bpl updateloop

  lda snakeDirection
  lsr
  bcs up
  lsr
  bcs right
  lsr
  bcs down
  lsr
  bcs left
up:
  lda snakeHeadL
  sec
  sbc #$20
  sta snakeHeadL
  bcc upup
  rts
upup:
  dec snakeHeadH
  lda #$1
  cmp snakeHeadH
  beq collision
  rts
right:
  inc snakeHeadL
  lda #$1f
  bit snakeHeadL
  beq collision
  rts
down:
  lda snakeHeadL
  clc
  adc #$20
  sta snakeHeadL
  bcs downdown
  rts
downdown:
  inc snakeHeadH
  lda #$6
  cmp snakeHeadH
  beq collision
  rts
left:
  dec snakeHeadL
  lda snakeHeadL
  and #$1f
  cmp #$1f
  beq collision
  rts
collision:
  jmp gameOver


drawApple:
  ldy #0
  lda sysRandom
  sta (appleL),y
  rts


drawSnake:
  ldx snakeLength
  lda #0
  sta (snakeHeadL,x) ; erase end of tail

  ldx #0
  lda #1
  sta (snakeHeadL,x) ; paint head
  rts


gameOver:
  brk

.org $FFFC
  .word $8000       ; RESET
  .word $9000       ; IRQ
