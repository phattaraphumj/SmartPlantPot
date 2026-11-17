"use client";

import { Waves, AlertTriangle, ShieldCheck } from "lucide-react";
import { SensorReading } from "@/types/plant";

interface WaterLevelCardProps {
  reading: SensorReading;
}

export function WaterLevelCard({ reading }: WaterLevelCardProps) {
  const clampedValue = Math.min(100, Math.max(0, reading.value));
  const isLow = clampedValue <= 20;

  return (
    <section className="group relative overflow-hidden rounded-3xl border border-emerald-950/8 bg-white/90 p-6 shadow-sm backdrop-blur-md transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
              isLow ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600"
            }`}
          >
            <Waves className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              ระดับน้ำในถังพัก
            </h2>
            <p className="text-xs text-slate-400">Water Reservoir Level</p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isLow
              ? "animate-pulse bg-rose-50 text-rose-700 ring-1 ring-rose-200"
              : "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
          }`}
        >
          {isLow ? (
            <AlertTriangle className="h-3.5 w-3.5" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5" />
          )}
          {isLow ? "Low Water Alert" : "น้ำเพียงพอ"}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-5xl font-bold tracking-tight text-slate-900">
              {clampedValue}
            </span>
            <span className="text-xl font-semibold text-slate-400">%</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {isLow
              ? "ระดับน้ำต่ำกว่า 20% กรุณาเติมน้ำ"
              : "พร้อมสำหรับระบบรดน้ำอัตโนมัติ"}
          </p>
        </div>

        {/* Mini Tank Visual */}
        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50 p-1">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-100">
            <div
              className={`absolute right-0 bottom-0 left-0 transition-all duration-500 ease-out ${
                isLow
                  ? "bg-gradient-to-t from-rose-500 to-rose-400"
                  : "bg-gradient-to-t from-sky-500 to-cyan-400"
              }`}
              style={{ height: `${clampedValue}%` }}
            />
          </div>
        </div>
      </div>

      {isLow ? (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-700 ring-1 ring-rose-200/80">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>เปิดระบบ Dry-Run Protection: ล็อกปั๊มน้ำเพื่อป้องกันปั๊มไหม้</span>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-slate-400">
          <span>ขั้นต่ำที่ปลอดภัย: 20%</span>
          <span>สถานะถัง: ปกติ</span>
        </div>
      )}
    </section>
  );
}
