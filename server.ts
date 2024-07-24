import dotenv from 'dotenv';
dotenv.config();
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import mongoose from "mongoose";
import TrayModel from "@/app/models/TrayModel";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev });
const handler = app.getRequestHandler();

const mongoUrl = process.env.MONGODB_URI;

if (!mongoUrl) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  mongoose.connect(mongoUrl)
    .then(() => {
      console.log("Connected to MongoDB using Mongoose successfully");
      
      io.on("connection", (socket) => {
        socket.emit("server_status", { 
          isConnected: true, 
          dbConnected: true 
        });
        socket.on("get_trays", async () => {
          try {
            const trays = await TrayModel.find().sort({ _id: -1 }).limit(10);
            socket.emit("tray_update", trays);
          } catch (error) {
            console.error("Error fetching trays:", error);
          }
        });
        socket.on("save_tray", async (data: TrayType, callback) => {
          try {
            const newTray = new TrayModel(data);
            const savedTray = await newTray.save();
            io.emit("tray_update", savedTray);
            if (callback) callback();
          } catch (error) {
            console.error("Error saving tray:", error);
            socket.emit("save_error", { message: "Error saving tray" });
            if (callback) callback();
          }
        });
        socket.on("delete_tray", async (id: string) => {
          try {
            await TrayModel.deleteOne({ _id: id });
            io.emit("tray_deleted", id);
            
          } catch (error) {
            console.error("Error deleting tray:", error);
            socket.emit("delete_error", { message: "Error deleting tray" });
          }
        });
        socket.on("disconnect", () => {
          console.log("A client disconnected");
        });
      });

      httpServer
        .once("error", (err: NodeJS.ErrnoException) => {
          console.error(err);
          process.exit(1);
        })
        .listen(port, () => {
          console.log(`-> Server is running on http://${hostname}:${port}`);
        });
    })
    .catch((err: Error) => {
      console.error("Failed to connect to MongoDB:", err);
      io.emit("server_status", { 
        isConnected: true, 
        dbConnected: false 
      });
      process.exit(1);
    });
}).catch((err: Error) => {
  console.error("Error preparing the Next.js app:", err);
  process.exit(1);
});