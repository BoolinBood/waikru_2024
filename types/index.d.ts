declare type ITray =  {
  _id?:string
  name: string;
  message: string;
  selectedTray: string;
}

declare module "node:http" {
  export * from "http";
}