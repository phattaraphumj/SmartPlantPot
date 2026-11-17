import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Plant Pot Dashboard",
  description: "ระบบติดตามความชื้นและรดน้ำต้นไม้อัจฉริยะ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
