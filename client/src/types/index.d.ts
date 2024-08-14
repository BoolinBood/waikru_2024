declare type TrayType = {
  _id?: string;
  name: string;
  message: string;
  flower: FlowerType;
  dept: Dept;
  degree: Degree;
};

declare type Dept = "IT" | "CS" | "DSI";

declare type Degree = "OLD_RIGHT" | "MASTER_DEGREE";

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
    degree?: Degree,
    callback?: (result: resultMessage) => void
  ) => void;
  deleteTray: (id: string) => void;
  loadMoreTrays: () => void;
  hasMore: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  currentDept: Dept[];
  setCurrentDept: (dept: Dept[]) => void;
  currentDegree: Degree | undefined;
  setCurrentDegree: (degree: Degree) => void;
  handleChangeTag: (newDept: Dept, degree) => void;
};

declare module "node:http" {
  export * from "http";
}

declare type ServerStatus = {
  isConnected: boolean;
  dbConnected: boolean;
};

declare type TrayPaginatedType = {
  pages: number;
  paginatedTrays: TrayType[][];
};

declare type resultMessage = {
  success: boolean;
  error?: string;
};
