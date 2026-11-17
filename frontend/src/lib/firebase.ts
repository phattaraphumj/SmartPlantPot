// TODO (Phase 2): เชื่อมต่อ Firebase Realtime Database เมื่อพร้อมทำ Backend
// ตัวอย่างการตั้งค่าเมื่อเปิดใช้งานจริง:
// import { initializeApp, getApps } from "firebase/app";
// import { getDatabase } from "firebase/database";

export const isMockMode =
  process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};
