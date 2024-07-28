declare type TrayType = {
  _id?: string;
  name: string;
  message: string;
  selectedTray: FlowerType;
  dept: string;
};

declare type Dept = "IT" | "CS" | "DSI" ;

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
  saveTray: (name: string, message: string, selectedTray: string, dept: string, callback?: () => void) => void;
  deleteTray: (id: string) => void;
  loadMoreTrays: () => void;
  hasMore: boolean;
};

declare module "node:http" {
  export * from "http";
}

declare type ServerStatus = {
  isConnected: boolean;
    dbConnected: boolean;
}

declare type TrayPaginatedType = {
  pages: number;
  paginatedTrays: TrayType[][];
}