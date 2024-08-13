"use client";
import { io } from "socket.io-client";

//10.4.56.60:
const socketUri = process.env.NEXT_PUBLIC_SOCKET_URL as string;

export const socket = io(socketUri);
