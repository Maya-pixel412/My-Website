export const HARDWARE_DATA = {
  cpus: [
    {
      id: "cpu-1",
      name: "Intel Core i5-13400F",
      price: 200,
      wattage: 65,
      tier: "Mid",
      socket: "LGA1700",
    },
    {
      id: "cpu-2",
      name: "AMD Ryzen 7 7800X3D",
      price: 380,
      wattage: 120,
      tier: "High",
      socket: "AM5",
    },
    {
      id: "cpu-3",
      name: "Intel Core i9-14900K",
      price: 550,
      wattage: 253,
      tier: "Ultra",
      socket: "LGA1700",
    },
  ],
  gpus: [
    {
      id: "gpu-1",
      name: "NVIDIA RTX 4060 8GB",
      price: 300,
      minPSU: 500,
      tier: "Mid",
    },
    {
      id: "gpu-2",
      name: "NVIDIA RTX 4070 Super",
      price: 600,
      minPSU: 650,
      tier: "High",
    },
    {
      id: "gpu-3",
      name: "NVIDIA RTX 4090 24GB",
      price: 1600,
      minPSU: 850,
      tier: "Ultra",
    },
  ],
  ram: [
    { id: "ram-1", name: "16GB (2x8GB) DDR5 5600MHz", price: 70, capacity: 16 },
    {
      id: "ram-2",
      name: "32GB (2x16GB) DDR5 6000MHz",
      price: 130,
      capacity: 32,
    },
    {
      id: "ram-3",
      name: "64GB (2x32GB) DDR5 6000MHz",
      price: 240,
      capacity: 64,
    },
  ],
  psus: [
    { id: "psu-1", name: "550W 80+ Bronze", price: 60, wattage: 550 },
    { id: "psu-2", name: "750W 80+ Gold", price: 110, wattage: 750 },
    { id: "psu-3", name: "1000W 80+ Platinum", price: 200, wattage: 1000 },
  ],
};
