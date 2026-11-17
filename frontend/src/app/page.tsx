"use client";

import { useState } from "react";
import { INITIAL_MOCK_STATE } from "@/lib/mockData";
import { isMockMode } from "@/lib/firebase";
import { PlantPotState, PlantPresetId, PumpMode } from "@/types/plant";
import { MoistureCard } from "@/components/MoistureCard";
import { WaterLevelCard } from "@/components/WaterLevelCard";
import { PumpControlCard } from "@/components/PumpControlCard";
import { PlantPresetSelector } from "@/components/PlantPresetSelector";

export default function DashboardPage() {
  const [state, setState] = useState<PlantPotState>(INITIAL_MOCK_STATE);

  const soil = state["soil-moisture"];
  const water = state["water-level"];
  const pump = state["pump-control"];
  const isWaterLow = water.value <= 20;

  const handleToggleMode = (mode: PumpMode) => {
    setState((prev) => ({
      ...prev,
      "pump-control": { ...prev["pump-control"], mode },
    }));
  };

  const handleThresholdChange = (threshold: number) => {
    setState((prev) => ({
      ...prev,
      "pump-control": {
        ...prev["pump-control"],
        threshold,
        plantPreset: "custom",
      },
    }));
  };

  const handleSelectPreset = (
    presetId: Exclude<PlantPresetId, "custom">,
    threshold: number
  ) => {
    setState((prev) => ({
      ...prev,
      "pump-control": {
        ...prev["pump-control"],
        plantPreset: presetId,
        threshold,
      },
    }));
  };

  const handleManualWater = () => {
    if (isWaterLow) return;
    setState((prev) => {
      const nextStatus = prev["pump-control"].status === "ON" ? "OFF" : "ON";
      return {
        ...prev,
        "pump-control": {
          ...prev["pump-control"],
          status: nextStatus,
          manualTrigger: nextStatus === "ON",
        },
      };
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Smart Plant Pot Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            ระบบติดตามความชื้นในดินและควบคุมการรดน้ำต้นไม้อัจฉริยะ
          </p>
        </div>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
          {isMockMode ? "โหมดจำลองข้อมูล (Mock Data)" : "เชื่อมต่อ Firebase แล้ว"}
        </span>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <MoistureCard reading={soil} threshold={pump.threshold} />
        <WaterLevelCard reading={water} />
      </div>

      <div className="mt-6 grid gap-6">
        <PumpControlCard
          control={pump}
          isWaterLow={isWaterLow}
          onToggleMode={handleToggleMode}
          onThresholdChange={handleThresholdChange}
          onManualWater={handleManualWater}
        />
        <PlantPresetSelector
          selectedPreset={pump.plantPreset}
          onSelectPreset={handleSelectPreset}
        />
      </div>
    </main>
  );
}
