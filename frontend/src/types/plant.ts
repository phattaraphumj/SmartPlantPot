export type SensorStatus = "normal" | "low" | "critical";
export type PumpStatus = "ON" | "OFF";
export type PumpMode = "AUTO" | "MANUAL";
export type PlantPresetId = "cactus" | "indoor" | "vegetable" | "custom";

export interface SensorReading {
  value: number; // 0 - 100 (%)
  status: SensorStatus;
  min: number;
  max: number;
}

export interface PumpControl {
  status: PumpStatus;
  mode: PumpMode;
  threshold: number; // 0 - 100 (%)
  manualTrigger: boolean;
  plantPreset: PlantPresetId;
}

export interface PlantPotState {
  "soil-moisture": SensorReading;
  "water-level": SensorReading;
  "pump-control": PumpControl;
}

export interface PlantPreset {
  id: Exclude<PlantPresetId, "custom">;
  name: string;
  description: string;
  recommendedThreshold: number;
}
