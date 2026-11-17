# STM32 Firmware (STM32CubeIDE)

วางไฟล์โปรเจกต์จาก STM32CubeIDE (เช่น `.ioc`, `Core/Inc/`, `Core/Src/`) ไว้ในโฟลเดอร์นี้เมื่อเริ่มพัฒนา Phase 3

## หน้าที่หลักของ STM32 (เช่น NUCLEO-F411RE)
- **ADC + DMA (2 Channels):** อ่านค่าจาก Soil Moisture Sensor และ Water Level Sensor
- **GPIO Output:** ควบคุม 5V Relay Module (KY-019) เพื่อเปิด-ปิดปั๊มน้ำ
- **UART (Full-Duplex):** ส่งข้อมูล `S%dW%dP%dE\r\n` ไปยัง ESP8266 และรับคำสั่งควบคุมกลับมา
- **Safety & Logic:**
  - Dry-Run Protection (ล็อกปั๊มเมื่อน้ำในถังต่ำกว่าเกณฑ์)
  - Pulse Watering & Cooldown (รดน้ำเป็นจังหวะ 3 วินาที แล้วรอซึม)
  - On-board B1 Button & LD2 LED
