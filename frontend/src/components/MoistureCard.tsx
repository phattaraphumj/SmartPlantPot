"use client";

import { SensorReading } from "@/types/plant";

interface MoistureCardProps {
  reading: SensorReading;
  threshold: number;
}

export function MoistureCard({ reading, threshold }: MoistureCardProps) {
  const isDry = reading.value < threshold;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-500">ความชื้นในดิน (Soil Moisture)</h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isDry ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {isDry ? "ดินแห้ง (ต่ำกว่าเกณฑ์)" : "ปกติ"}
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-slate-900">{reading.value}%</span>
        <span className="text-xs text-slate-400">เกณฑ์รดน้ำ &lt; {threshold}%</span>
      </div>
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full transition-all duration-300 ${
            isDry ? "bg-amber-500" : "bg-emerald-500"
          }`}
          style={{ width: `${Math.min(100, Math.max(0, reading.value))}%` }}
        />
      </div>
    </div>
  );
}
