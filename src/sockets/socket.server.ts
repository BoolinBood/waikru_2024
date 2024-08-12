import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import connectToMongoDB from "@/src/utils/db.utils";
import setupSocketEvents from "./socket.event";

const isDevelopment = process.env.NODE_ENV !== "production";
const hostname = isDevelopment ? "0.0.0.0" : "10.4.56.60";
const port = 3000;

// Initialize Express app
const app = next({ dev: isDevelopment });
const handler = app.getRequestHandler();

connectToMongoDB()
  .then((isConnected) => {
    console.log("MongoDB connected:", isConnected);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const startServer = async () => {
  try {
    await app.prepare();
    const httpServer = createServer(handler);
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

startServer();
