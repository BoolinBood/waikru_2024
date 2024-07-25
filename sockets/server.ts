import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import connectToMongoDB from "@/utils/db.utils";
import setupSocketEvents from "./setupEvent";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev });
const handler = app.getRequestHandler();


connectToMongoDB().then((isConnected) => {
  console.log("MongoDB connected:", isConnected);
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
})

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

    httpServer.once("error", (err: NodeJS.ErrnoException) => {
      console.error(err);
      process.exit(1);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();