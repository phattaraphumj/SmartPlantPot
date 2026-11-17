"use client";

import { Droplets, AlertCircle, CheckCircle2 } from "lucide-react";
import { SensorReading } from "@/types/plant";

interface MoistureCardProps {
  reading: SensorReading;
  threshold: number;
}

export function MoistureCard({ reading, threshold }: MoistureCardProps) {
  const clampedValue = Math.min(100, Math.max(0, reading.value));
  const isDry = clampedValue < threshold;

  return (
    <section className="group relative overflow-hidden rounded-3xl border border-emerald-950/8 bg-white/90 p-6 shadow-sm backdrop-blur-md transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
              isDry
                ? "bg-amber-100 text-amber-600"
                : "bg-emerald-100 text-emerald-600"
            }`}
          >
            <Droplets className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              ความชื้นในดิน
            </h2>
            <p className="text-xs text-slate-400">Soil Moisture Sensor</p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isDry
              ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          }`}
        >
          {isDry ? (
            <AlertCircle className="h-3.5 w-3.5" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5" />
          )}
          {isDry ? "ดินแห้ง (ต่ำกว่าเกณฑ์)" : "ความชื้นเหมาะสม"}
        </span>
      </div>

      <div className="mt-6 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl font-bold tracking-tight text-slate-900">
            {clampedValue}
          </span>
          <span className="text-xl font-semibold text-slate-400">%</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">เกณฑ์รดน้ำอัตโนมัติ</span>
          <p className="text-sm font-semibold text-slate-700">&lt; {threshold}%</p>
        </div>
      </div>

      {/* Progress bar with threshold marker */}
      <div className="mt-5">
        <div className="relative h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isDry
                ? "bg-gradient-to-r from-amber-400 to-orange-500"
                : "bg-gradient-to-r from-emerald-400 to-teal-500"
            }`}
            style={{ width: `${clampedValue}%` }}
          />
          <div
            title={`Threshold: ${threshold}%`}
            className="absolute top-0 bottom-0 w-0.5 bg-slate-800/70"
            style={{ left: `${threshold}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
          <span>แห้ง (0%)</span>
          <span className="text-slate-600">เกณฑ์ {threshold}%</span>
          <span>ชุ่มชื้น (100%)</span>
        </div>
      </div>
    </section>
  );
}
