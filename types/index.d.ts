declare type TrayType =  {
  _id?:string
  name: string;
  message: string;
  selectedTray: string;
}

declare type AppContextType =  {
  isConnected: boolean;
  dbConnected: boolean;
  transport: string;
  trays: TrayType[];
  saveTray: (name: string, message: string, selectedTray: string, callback?: () => void) => void;
  deleteTray: (id: string) => void;
}

declare module "node:http" {
  export * from "http";
}