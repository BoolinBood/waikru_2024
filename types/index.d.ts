declare type TrayType = {
  _id?: string;
  name: string;
  message: string;
  flower: FlowerType;
  dept: Dept;
};

declare type Dept = "IT" | "CS" | "DSI" | "";

declare type FlowerType =
  | "ixora"
  | "eggplant"
  | "cherry-blossoms"
  | "marigold"
  | "orchid"
  | "zinnia"
  | "";

declare type AppContextType = {
  isConnected: boolean;
  dbConnected: boolean;
  transport: string;
  trays: TrayType[];
  saveTray: (
    name: string,
    message: string,
    flower: FlowerType,
    dept: Dept,
    callback?: (result: resultMessage) => void
  ) => void;
  deleteTray: (id: string) => void;
  loadMoreTrays: () => void;
  hasMore: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  currentDept: Dept[] | null;
  setCurrentDept: (dept: Dept[] | null) => void;
  changeDept: (newDept: Dept[] | null) => void;
};

declare module "node:http" {
  export * from "http";
}

declare type ServerStatus = {
  isConnected: boolean;
  dbConnected: boolean;
};


declare type resultMessage = {
  success: string;
  error?: string;
};
