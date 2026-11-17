"use client";

import { PLANT_PRESETS } from "@/lib/mockData";
import { PlantPresetId } from "@/types/plant";

interface PlantPresetSelectorProps {
  selectedPreset: PlantPresetId;
  onSelectPreset: (presetId: Exclude<PlantPresetId, "custom">, threshold: number) => void;
}

export function PlantPresetSelector({
  selectedPreset,
  onSelectPreset,
}: PlantPresetSelectorProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium text-slate-500">
        โหมดชนิดต้นไม้ (Plant Profile Presets)
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {PLANT_PRESETS.map((preset) => {
          const active = selectedPreset === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id, preset.recommendedThreshold)}
              className={`rounded-xl border p-4 text-left transition ${
                active
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="text-sm font-semibold text-slate-900">{preset.name}</div>
              <div className="mt-1 text-xs text-slate-500">{preset.description}</div>
              <div className="mt-2 text-xs font-medium text-emerald-700">
                Threshold: {preset.recommendedThreshold}%
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
