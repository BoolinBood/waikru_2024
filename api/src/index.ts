import { createServer } from "http";
import { Server } from "socket.io";

import express from "express";
import dotenv from "dotenv";

import connectToMongoDB from "./utils/db.utils";
import setupSocketEvents from "./sockets/socket.event";

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== "production";
const hostname = isDevelopment ? "0.0.0.0" : "10.4.56.60";

const port = process.env.PORT || 4000;

// Initialize Express app
const app = express();
// Optional: Add middleware to parse request body
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    setupSocketEvents(io);

    httpServer.listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

    httpServer.once("error", (err) => {
      console.error(err);
      process.exit(1);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

connectToMongoDB();
startServer();
