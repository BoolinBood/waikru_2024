"use client";
import { io } from "socket.io-client";

const port = process.env.NODE_ENV === "production" ? 80 : 3000;

export const socket = io(`http://localhost:${port}`);
