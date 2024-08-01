"use server";
import { Server } from "socket.io";
import TrayModel from "@/app/models/TrayModel";
import { checkDirtyWords } from "@/utils/tray.utils";

const itemsPerPage = 4;

const setupSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`A client connected with ID: ${socket.id}`);
    socket.emit("server_status", {
      isConnected: true,
      dbConnected: true,
    });
    socket.on(
      "get_trays",
      async (page: number = 1, dept: Dept[] | null = null) => {
        try {
          const skip = (page - 1) * itemsPerPage;
          let query = dept ? { dept } : {};

          const trays = await TrayModel.find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(itemsPerPage);

          const totalCount = await TrayModel.countDocuments(query);
          socket.emit("tray_update", {
            trays: trays.length > 0 ? trays : [],
            totalCount,
          });
        } catch (error) {
          console.error("Error fetching trays:", error);
          socket.emit("fetch_error", { message: "Error fetching trays" });
        }
      }
    );

    socket.on("get_all_trays", async () => {
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
        if (checkDirtyWords(data.message)) {
          throw new Error("Message must not contain profanity");
        }
        const newTray = new TrayModel(data);
        await newTray.save();
        const savedTray = await TrayModel.findById(newTray._id);
        io.emit("new_tray", savedTray);
        const totalCount = await TrayModel.countDocuments();
        io.emit("update_total_count", totalCount);

        if (callback) callback({ success: true });
      } catch (error: any) {
        socket.emit("save_error", {
          message: error.message || "Error saving tray",
        });
        if (callback)
          callback({
            success: false,
            error: error.message || "Error saving tray",
          });
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
};

export default setupSocketEvents;
