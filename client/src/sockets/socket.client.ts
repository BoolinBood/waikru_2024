"use client";
import { io } from "socket.io-client";

const socketUri =
  process.env.NODE_ENV === "production"
    ? `https://sit-waikru.sit.kmutt.ac.th`
    : `http://localhost:4000`;

const options =
  process.env.NODE_ENV === "production" ? { path: "/api/socket.io" } : {};
  
export const socket = io(socketUri, options);
