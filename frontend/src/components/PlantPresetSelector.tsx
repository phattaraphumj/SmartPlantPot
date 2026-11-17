"use client";

import { Sprout, Leaf, Flower2, Check } from "lucide-react";
import { PLANT_PRESETS } from "@/lib/mockData";
import { PlantPresetId } from "@/types/plant";

interface PlantPresetSelectorProps {
  selectedPreset: PlantPresetId;
  onSelectPreset: (
    presetId: Exclude<PlantPresetId, "custom">,
    threshold: number
  ) => void;
}

const PRESET_ICONS: Record<Exclude<PlantPresetId, "custom">, typeof Sprout> = {
  cactus: Flower2,
  indoor: Leaf,
  vegetable: Sprout,
};

export function PlantPresetSelector({
  selectedPreset,
  onSelectPreset,
}: PlantPresetSelectorProps) {
  return (
    <section className="rounded-3xl border border-emerald-950/8 bg-white/90 p-6 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            โหมดชนิดต้นไม้ (Plant Profile Presets)
          </h2>
          <p className="text-xs text-slate-400">
            เลือกโปรไฟล์เพื่อปรับเกณฑ์ความชื้นอัตโนมัติให้เหมาะกับต้นไม้
          </p>
        </div>
        {selectedPreset === "custom" && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            กำหนดเอง (Custom)
          </span>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {PLANT_PRESETS.map((preset) => {
          const active = selectedPreset === preset.id;
          const Icon = PRESET_ICONS[preset.id];

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id, preset.recommendedThreshold)}
              className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500/30"
                  : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    active
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                {active && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="text-sm font-semibold text-slate-900">
                  {preset.name}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {preset.description}
                </p>
              </div>

              <div className="mt-3 inline-flex w-fit items-center rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/80">
                Threshold: {preset.recommendedThreshold}%
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
