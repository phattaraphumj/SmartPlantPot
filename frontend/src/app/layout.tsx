import type { Metadata } from "next";
import { Noto_Sans_Thai, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smart Plant Pot | Dashboard",
  description: "ระบบติดตามความชื้นในดินและรดน้ำต้นไม้อัจฉริยะแบบเรียลไทม์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${jakarta.variable} ${notoThai.variable}`}>
      <body className="min-h-screen bg-[#f3f7f4] font-[family-name:var(--font-jakarta),var(--font-noto-thai),sans-serif] text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-950">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-sky-200/35 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
