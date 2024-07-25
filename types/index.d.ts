declare type TrayType = {
  _id?: string;
  name: string;
  message: string;
  selectedTray: FlowerType;
};

declare type FlowerType =
  | "ixora"
  | "eggplant"
  | "cherry-blossoms"
  | "marigold"
  | "orchid"
  | "zinnia";

declare type AppContextType = {
  isConnected: boolean;
  dbConnected: boolean;
  transport: string;
  trays: TrayType[];
<<<<<<< HEAD
  saveTray: (name: string, message: string, selectedTray: string, callback?: () => void) => void;
=======
  saveTray: (
    name: string,
    message: string,
    selectedTray: string,
    callback?: () => void
  ) => void;
>>>>>>> origin/backup
  deleteTray: (id: string) => void;
};

declare module "node:http" {
  export * from "http";
}
