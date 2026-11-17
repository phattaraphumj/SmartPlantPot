"use client";

import { useState } from "react";
import { Sprout, FlaskConical, Wifi } from "lucide-react";
import { INITIAL_MOCK_STATE } from "@/lib/mockData";
import { isMockMode } from "@/lib/firebase";
import { PlantPotState, PlantPresetId, PumpMode } from "@/types/plant";
import { MoistureCard } from "@/components/MoistureCard";
import { WaterLevelCard } from "@/components/WaterLevelCard";
import { PumpControlCard } from "@/components/PumpControlCard";
import { PlantPresetSelector } from "@/components/PlantPresetSelector";

export default function DashboardPage() {
  const [state, setState] = useState<PlantPotState>(INITIAL_MOCK_STATE);
  const [showSimulator, setShowSimulator] = useState(false);

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

  const updateMockSensor = (
    key: "soil-moisture" | "water-level",
    value: number
  ) => {
    setState((prev) => {
      const nextWaterLow = key === "water-level" ? value <= 20 : isWaterLow;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          value,
          status: value <= 20 ? "low" : "normal",
        },
        "pump-control": nextWaterLow
          ? { ...prev["pump-control"], status: "OFF", manualTrigger: false }
          : prev["pump-control"],
      };
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/20">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Smart Plant Pot
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              ระบบติดตามความชื้นและรดน้ำต้นไม้อัจฉริยะ (Embedded Lab)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isMockMode && (
            <button
              type="button"
              onClick={() => setShowSimulator((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              <FlaskConical className="h-3.5 w-3.5 text-emerald-600" />
              {showSimulator ? "ซ่อนตัวจำลองค่า" : "จำลองค่าเซนเซอร์"}
            </button>
          )}
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
              isMockMode
                ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                : "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
            }`}
          >
            <Wifi className="h-3.5 w-3.5" />
            {isMockMode ? "Mock Mode (Frontend)" : "Firebase Live"}
          </span>
        </div>
      </header>

      {/* Optional Mock Sensor Simulator for Phase 1 UI testing */}
      {isMockMode && showSimulator && (
        <div className="mb-6 rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/60 p-5 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">
              ตัวจำลองค่าเซนเซอร์ (สำหรับทดสอบ UI ก่อนต่อบอร์ดจริง)
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1 flex justify-between text-xs text-slate-700">
                <span>จำลอง Soil Moisture</span>
                <span className="font-bold">{soil.value}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={soil.value}
                onChange={(e) =>
                  updateMockSensor("soil-moisture", Number(e.target.value))
                }
                className="h-2 w-full accent-emerald-600"
              />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs text-slate-700">
                <span>จำลอง Water Level</span>
                <span className="font-bold">{water.value}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={water.value}
                onChange={(e) =>
                  updateMockSensor("water-level", Number(e.target.value))
                }
                className="h-2 w-full accent-sky-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sensor Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <MoistureCard reading={soil} threshold={pump.threshold} />
        <WaterLevelCard reading={water} />
      </div>

      {/* Controls & Presets */}
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
