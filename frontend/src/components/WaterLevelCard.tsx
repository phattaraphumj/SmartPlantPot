"use client";

import { SensorReading } from "@/types/plant";

interface WaterLevelCardProps {
  reading: SensorReading;
}

export function WaterLevelCard({ reading }: WaterLevelCardProps) {
  const isLow = reading.value <= 20;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-500">ระดับน้ำในถังพัก (Water Level)</h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isLow ? "bg-rose-100 text-rose-800" : "bg-sky-100 text-sky-800"
          }`}
        >
          {isLow ? "Low Water Alert!" : "เพียงพอ"}
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-slate-900">{reading.value}%</span>
      </div>
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full transition-all duration-300 ${
            isLow ? "bg-rose-500" : "bg-sky-500"
          }`}
          style={{ width: `${Math.min(100, Math.max(0, reading.value))}%` }}
        />
      </div>
      {isLow && (
        <p className="mt-3 text-xs font-medium text-rose-600">
          น้ำในถังพักใกล้หมด กรุณาเติมน้ำ (ระบบล็อกปั๊มเพื่อป้องกันปั๊มไหม้)
        </p>
      )}
    </div>
  );
}
