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

declare module "node:http" {
  export * from "http";
}



