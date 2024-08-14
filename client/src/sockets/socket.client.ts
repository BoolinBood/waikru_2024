"use client";
import { io } from "socket.io-client";

const socketUri =
  process.env.NODE_ENV === "production"
    ? `http://sit-waikru.sit.kmutt.ac.th/api`
    : `http://localhost:4000`;

export const socket = io(socketUri);
