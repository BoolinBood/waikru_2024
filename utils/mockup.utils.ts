const trayTypes: FlowerType[] = [
  "eggplant",
  "cherry-blossoms",
  "ixora",
  "orchid",
  "zinnia",
  "marigold",
];

export const generateMockData = (count: number): TrayType[] => {
  return Array.from({ length: count }, (_, index) => ({
    name: `น้องสมชาย ใจดี ${index + 1}`,
    message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum ...",
    selectedTray: trayTypes[index % trayTypes.length],
  }));
};
