"use server"
import { Server } from "socket.io";
import TrayModel from "@/app/models/TrayModel";

const setupSocketEvents = (io: Server) => {
    io.on("connection", (socket) => {
      console.log(`A client connected with ID: ${socket.id}`);
      socket.emit("server_status", {
        isConnected: true,
        dbConnected: true,
      });
      socket.on("get_trays", async () => {
        try {
          const trays = await TrayModel.find().sort({ _id: -1 });
          socket.emit("tray_update", trays);
        } catch (error) {
          console.error("Error fetching trays:", error);
          socket.emit("fetch_error", { message: "Error fetching trays" });
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
      })
      socket.on("disconnect", () => {
        console.log("A client disconnected");
      });
    });
  };

export default setupSocketEvents




//! socket.emit ใช้เพื่อส่งอีเวนต์และข้อมูลไปยัง client

//! Server ใช้ .on เพื่อรับฟังอีเวนต์จาก client และใช้ .emit เพื่อส่งอีเวนต์ไปยัง client

//! Client ก็ใช้ .on เพื่อรับฟังอีเวนต์จาก server และใช้ .emit เพื่อส่งอีเวนต์ไปยัง server 

//! io.emit เป็นการส่งข้อมูลหรืออีเวนต์ไปยังทุกการเชื่อมต่อ (connections) ที่เชื่อมต่ออยู่กับเซิร์ฟเวอร์, ใช้เมื่อต้องการกระจายข้อมูลไปยังทุกไคลเอนต์พร้อมกัน, ใช้เพื่อส่งข้อมูลไปยังทุกการเชื่อมต่อ

//! io.on ใช้สำหรับจัดการเหตุการณ์ที่เกี่ยวข้องกับ Socket.IO server โดยตรง, มักใช้เพื่อจัดการการเชื่อมต่อใหม่ (เมื่อมี user คนใหม่เข้ามาใน server), ช้เพื่อจัดการเหตุการณ์ระดับเซิร์ฟเวอร์ (เช่น การเชื่อมต่อใหม่)

//! io เป็นตัวแทนของ Socket.IO server ทั้งหมด ดังนั้น io.emit จึงส่งไปยังทุกการเชื่อมต่อ

//! socket เป็นตัวแทนของการเชื่อมต่อเดี่ยว ดังนั้น socket.emit จึงส่งไปยังเฉพาะการเชื่อมต่อนั้นๆ