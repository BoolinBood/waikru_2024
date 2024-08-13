"use client";
import { io } from "socket.io-client";

//10.4.56.60:
const socketUri =
  process.env.NODE_ENV === "production"
    ? `http://localhost:4000`
    : `http://localhost:4000`;

export const socket = io(socketUri);
