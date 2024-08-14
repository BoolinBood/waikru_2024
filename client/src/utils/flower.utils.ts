export const getFlowerPath = (flower: string) => {
  return `/assets/flowers/${flower}.svg`;
};

/**
 * @description
 * This flowers array size based on the size that need to be decreased
 * For example, smallFlowers mean that we need to reduce the size of these
 * flowers only a little
 */

export const smallFlowers: FlowerType[] = ["marigold"];

export const mediumFlowers: FlowerType[] = ["eggplant", "cherry-blossoms"];

export const largeFlowers: FlowerType[] = ["orchid", "zinnia"];

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
      return "Sakura";
    case "marigold":
      return "Marigold";
    case "orchid":
      return "Orchid";
    case "zinnia":
      return "Zinnia";
  }
};
