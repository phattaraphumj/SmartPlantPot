import { PlantPotState, PlantPreset } from "@/types/plant";

export const PLANT_PRESETS: PlantPreset[] = [
  {
    id: "cactus",
    name: "กระบองเพชร / ไม้อวบน้ำ",
    description: "ทนแล้ง รดน้ำเมื่อดินแห้งมาก",
    recommendedThreshold: 20,
  },
  {
    id: "indoor",
    name: "ไม้ใบในร่ม",
    description: "ความชื้นปานกลาง เหมาะกับไม้ประดับทั่วไป",
    recommendedThreshold: 40,
  },
  {
    id: "vegetable",
    name: "พืชสวนครัว",
    description: "ต้องการความชื้นสม่ำเสมอ",
    recommendedThreshold: 60,
  },
];

export const INITIAL_MOCK_STATE: PlantPotState = {
  "soil-moisture": {
    value: 45,
    status: "normal",
    min: 0,
    max: 100,
  },
  "water-level": {
    value: 70,
    status: "normal",
    min: 0,
    max: 100,
  },
  "pump-control": {
    status: "OFF",
    mode: "AUTO",
    threshold: 40,
    manualTrigger: false,
    plantPreset: "indoor",
  },
};
