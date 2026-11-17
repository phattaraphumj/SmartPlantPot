# UART Communication Protocol (STM32 <-> ESP8266)

การสื่อสารแบบ Full-Duplex UART (แนะนำ Baud Rate: `115200` หรือ `9600`)

## 1. STM32 -> ESP8266 (ส่งสถานะปัจจุบันขึ้น Firebase)

รูปแบบ String:
`S<soil>W<water>P<pump>E\r\n`

- `S<soil>`: ค่าความชื้นในดินเป็นเปอร์เซ็นต์ (`0` - `100`)
- `W<water>`: ค่าระดับน้ำในถังพักเป็นเปอร์เซ็นต์ (`0` - `100`)
- `P<pump>`: สถานะปั๊มน้ำ (`0` = OFF, `1` = ON)
- `E`: ตัวอักษรปิดท้ายเฟรมข้อมูล

**ตัวอย่าง:** `S42W80P0E\r\n` (ดินชื้น 42%, น้ำในถัง 80%, ปั๊มปิด)

## 2. ESP8266 -> STM32 (ส่งคำสั่งควบคุมจากหน้าเว็บ)

รูปแบบ String:
`M<mode>T<threshold>C<cmd>E\r\n`

- `M<mode>`: โหมดการทำงาน (`0` = MANUAL, `1` = AUTO)
- `T<threshold>`: เกณฑ์ความชื้นสำหรับโหมด Auto (`0` - `100`)
- `C<cmd>`: คำสั่งเปิด/ปิดปั๊มแบบ Manual (`0` = OFF, `1` = ON)

**ตัวอย่าง:** `M1T40C0E\r\n` (โหมด Auto, Threshold 40%, Manual Trigger OFF)
