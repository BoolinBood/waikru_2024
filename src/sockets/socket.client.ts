"use client";
import { io } from "socket.io-client";

const socketUri =
  process.env.NODE_ENV === "production"
    ? `http://10.4.56.60:80`
    : `http://localhost:3000`;

export const socket = io(socketUri);
