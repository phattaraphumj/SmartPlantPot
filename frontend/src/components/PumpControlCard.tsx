"use client";

import { Power, SlidersHorizontal, Lock, Droplet, Square } from "lucide-react";
import { PumpControl, PumpMode } from "@/types/plant";

interface PumpControlCardProps {
  control: PumpControl;
  isWaterLow: boolean;
  onToggleMode: (mode: PumpMode) => void;
  onThresholdChange: (value: number) => void;
  onManualWater: () => void;
}

export function PumpControlCard({
  control,
  isWaterLow,
  onToggleMode,
  onThresholdChange,
  onManualWater,
}: PumpControlCardProps) {
  const isPumpOn = control.status === "ON";

  return (
    <section className="rounded-3xl border border-emerald-950/8 bg-white/90 p-6 shadow-sm backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
              isPumpOn
                ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <Power className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              ควบคุมปั๊มน้ำอัตโนมัติ
            </h2>
            <p className="text-xs text-slate-400">5V Relay Module (KY-019)</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isPumpOn ? "animate-ping bg-emerald-500" : "bg-slate-400"
            }`}
          />
          <span className="text-xs font-semibold text-slate-700">
            สถานะปั๊ม: {control.status}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-center">
        {/* Left: Mode & Threshold */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              โหมดการทำงาน (Operation Mode)
            </label>
            <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1">
              {(["AUTO", "MANUAL"] as PumpMode[]).map((mode) => {
                const active = control.mode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => onToggleMode(mode)}
                    className={`rounded-xl py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {mode === "AUTO" ? "อัตโนมัติ (AUTO)" : "สั่งเอง (MANUAL)"}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                เกณฑ์ความชื้น (Threshold)
              </span>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                {control.threshold}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              value={control.threshold}
              onChange={(e) => onThresholdChange(Number(e.target.value))}
              className="h-2 w-full appearance-none rounded-lg bg-slate-200 accent-emerald-600"
            />
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
              <span>10% (แห้งมาก)</span>
              <span>80% (ชื้นมาก)</span>
            </div>
          </div>
        </div>

        {/* Right: Manual Override Action */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
          <div>
            <h3 className="text-xs font-semibold text-slate-700">
              สั่งรดน้ำแบบ Manual Override
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              ใช้สำหรับสั่งเปิด-ปิดปั๊มน้ำทันทีจากหน้าเว็บ ระบบจะตัดการทำงานอัตโนมัติหากน้ำในถังหมด
            </p>
          </div>

          <button
            type="button"
            disabled={isWaterLow}
            onClick={onManualWater}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99] ${
              isWaterLow
                ? "cursor-not-allowed bg-slate-300 text-slate-500 shadow-none"
                : isPumpOn
                  ? "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            }`}
          >
            {isWaterLow ? (
              <>
                <Lock className="h-4 w-4" />
                ล็อกการทำงาน (น้ำในถังหมด)
              </>
            ) : isPumpOn ? (
              <>
                <Square className="h-4 w-4 fill-current" />
                หยุดรดน้ำ (Stop Pump)
              </>
            ) : (
              <>
                <Droplet className="h-4 w-4" />
                สั่งรดน้ำทันที (Water Now)
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
