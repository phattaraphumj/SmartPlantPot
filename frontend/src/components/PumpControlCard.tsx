"use client";

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-500">ควบคุมปั๊มน้ำ (Pump Control)</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isPumpOn ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
          }`}
        >
          ปั๊ม: {control.status}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        {(["AUTO", "MANUAL"] as PumpMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onToggleMode(mode)}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
              control.mode === mode
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            โหมด {mode}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs text-slate-600">
          <span>เกณฑ์ความชื้นอัตโนมัติ (Threshold)</span>
          <span className="font-semibold">{control.threshold}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={80}
          value={control.threshold}
          onChange={(e) => onThresholdChange(Number(e.target.value))}
          className="mt-2 w-full accent-emerald-600"
        />
      </div>

      <button
        type="button"
        disabled={isWaterLow}
        onClick={onManualWater}
        className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
          isWaterLow
            ? "cursor-not-allowed bg-slate-300"
            : isPumpOn
              ? "bg-rose-600 hover:bg-rose-700"
              : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {isWaterLow
          ? "ล็อกการทำงาน (น้ำในถังหมด)"
          : isPumpOn
            ? "หยุดรดน้ำ (Stop Pump)"
            : "สั่งรดน้ำทันที (Manual Water)"}
      </button>
    </div>
  );
}
