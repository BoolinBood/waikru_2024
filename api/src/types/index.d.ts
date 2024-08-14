declare type TrayType = {
  _id?: string;
  name: string;
  message: string;
  flower: FlowerType;
  dept: Dept;
  degree: Degree;
};

declare type Dept = "IT" | "CS" | "DSI" | "";

declare type Degree = "OLD_RIGHT" | "MASTER_DEGREE" | "";

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
