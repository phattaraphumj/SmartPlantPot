# Smart Plant Pot (กระถางต้นไม้อัจฉริยะ)

โปรเจกต์ระบบรดน้ำต้นไม้อัตโนมัติและติดตามสถานะผ่านเว็บไซต์แบบเรียลไทม์ (Embedded System Laboratory)

## โครงสร้างโปรเจกต์ (Project Structure)

```text
smartplantpot/
├── README.md
├── .gitignore
├── docs/                           # เอกสารออกแบบระบบและ Protocol
│   ├── database-schema.json        # โครงสร้างข้อมูล Firebase Realtime Database
│   └── uart-protocol.md            # รูปแบบการสื่อสาร UART ระหว่าง STM32 <-> ESP8266
├── frontend/                       # [Phase 1] เว็บไซต์ Dashboard (Next.js + TailwindCSS)
│   ├── .env.local.example
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app/                    # หน้าเว็บหลัก (App Router)
│       ├── components/             # UI Components (การ์ดแสดงผล, ปุ่มควบคุม, Preset)
│       ├── lib/                    # Mock Data (สำหรับทำ Frontend ก่อน) & Firebase SDK
│       └── types/                  # TypeScript Interfaces
└── firmware/                       # [Phase 2-3] โค้ดฝั่งไมโครคอนโทรลเลอร์
    ├── stm32/                      # โปรเจกต์ STM32CubeIDE (C)
    └── esp8266/                    # โปรเจกต์ NodeMCU ESP8266 (Arduino)
```

## แผนการพัฒนา (Roadmap)

1. **Phase 1: Frontend (เริ่มทำส่วนนี้ก่อน)**
   - พัฒนา UI Dashboard ด้วย Next.js + TailwindCSS โดยใช้ข้อมูลจำลองจาก `frontend/src/lib/mockData.ts`
   - ทดสอบการแสดงผลความชื้นในดิน, ระดับน้ำ, การแจ้งเตือน Low Water, การกดรดน้ำ Manual และ Plant Presets
2. **Phase 2: Backend (Firebase Realtime Database)**
   - สร้างโปรเจกต์ Firebase และตั้งค่า Realtime Database ตาม `docs/database-schema.json`
   - นำค่า Config มาใส่ใน `frontend/.env.local` แล้วสลับจากการใช้ Mock Data ไปใช้ `firebase.ts`
3. **Phase 3: Embedded System (STM32 + ESP8266)**
   - ตั้งค่าพินใน STM32CubeIDE (ADC+DMA, GPIO Relay, UART) และเขียน Logic (Dry-Run Protection, Pulse Watering)
   - เขียนโค้ด ESP8266 เชื่อมต่อ Wi-Fi, Firebase และสื่อสาร UART กับ STM32 ตาม `docs/uart-protocol.md`
