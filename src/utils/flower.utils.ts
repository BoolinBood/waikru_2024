export const getFlowerPath = (flower: string) => {
  return `/assets/flowers/${flower}.png`;
};

export const getFlowers = () => {
  return [
    "ixora",
    "eggplant",
    "cherry-blossoms",
    "marigold",
    "orchid",
    "zinnia",
  ];
};

export const getFlowerName = (flower: FlowerType) => {
  switch (flower) {
    case "ixora":
      return "Ixora";
    case "eggplant":
      return "Eggplant";
    case "cherry-blossoms":
      return "Cherry Blossoms";
    case "marigold":
      return "Marigold";
    case "orchid":
      return "Orchid";
    case "zinnia":
      return "Zinnia";
  }
};
