// Skeleton สำหรับ Phase 2-3: NodeMCU ESP8266 <-> Firebase & STM32 UART
// ดูรูปแบบการสื่อสารได้ใน docs/uart-protocol.md และ docs/database-schema.json

#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  // TODO: เชื่อมต่อ Wi-Fi และ Firebase Realtime Database
}

void loop() {
  // TODO:
  // 1. อ่าน String "S<soil>W<water>P<pump>E" จาก UART แล้วอัปเดตขึ้น Firebase
  // 2. อ่านค่า mode, threshold, manualTrigger จาก Firebase แล้วส่ง "M<mode>T<threshold>C<cmd>E" ไปยัง STM32
}
