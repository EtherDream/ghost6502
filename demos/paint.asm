;
; assembler: https://www.masswerk.at/6502/assembler.html
;
MOUSE_BTN       = $FB
MOUSE_X         = $FC
MOUSE_Y         = $FD
LAST_KEY        = $FF
SCREEN_ADDR_H   = $02

color           = $00
point_l         = $01
point_h         = $02

.org color
  .byte $01         ; default color (white)


.org $8000          ; reset and irq entry
  ldx LAST_KEY      ; read key

  cpx #('9+1)       ; if key > '9' then goto read_key_end
  bcs read_key_end

  cpx #('0)         ; if key < '0' then goto read_key_end
  bcc read_key_end
                    ; c = 1
  txa
  sbc #('0-1)       ; key = '0'  ->  color = 1, ...
                    ; key = '9'  ->  color = 10
  sta color         ; save color

read_key_end:
  ldx MOUSE_BTN     ; read mouse button
  beq loop_exit     ; if MOUSE_BTN = 0 then goto loop_exit

  lda MOUSE_Y       ; *point_l = (MOUSE_Y << 5) + MOUSE_X
  asl
  asl
  asl
  asl
  asl
  ora MOUSE_X
  sta point_l

  lda MOUSE_Y       ; *point_h = (MOUSE_Y >> 3) + SCREEN_ADDR_H
  lsr
  lsr
  lsr
  clc
  adc #SCREEN_ADDR_H
  sta point_h

  lda #0            ; a = black
  cpx #2            ; if MOUSE_BTN = 2 then goto draw_point
  beq draw_point
  lda color         ; a = saved_color

draw_point:
  ldy #0
  sta (point_l),Y

loop_exit:
  rti


.org $FFFC
  .word $8000       ; RESET
  .word $8000       ; IRQ
