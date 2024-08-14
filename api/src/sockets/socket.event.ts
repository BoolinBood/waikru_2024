import { Server, Socket } from "socket.io";
import {
  addBadword,
  addMoreBadword,
  badWords,
  checkBadWords,
} from "../utils/badWords.utils";
import TrayModel from "../models/tray.model";
import SettingsModel from "../models/setting.model";
import { loadBadwords, loadStatus } from "../utils/db.utils";

const itemsPerPage = 4;

let isReadOnly = false;

const setupSocketEvents = (io: Server) => {
  setTimeout(async () => {
    isReadOnly = (await loadStatus()) as boolean;
    addMoreBadword((await loadBadwords()) as string[]);
  }, 100);

  io.on("connection", (socket: Socket) => {
    console.log(`A client connected with ID: ${socket.id}`);

    socket.emit("server_status", {
      isConnected: true,
      dbConnected: true,
    });

    socket.emit("read_only_status", isReadOnly);
    socket.emit("bad_words_update", badWords);

    socket.on("add_bad_word", async (word: string) => {
      if (isReadOnly) {
        console.log("Database is in read-only mode");
        return;
      }

      try {
        await SettingsModel.findOneAndUpdate(
          {},
          { $push: { badWords: word } },
          { upsert: true }
        );
        addBadword(word);
      } catch (error) {
        console.error("Error adding bad word:", error);
      }
    });

    socket.on("delete_bad_word", async (word: string) => {
      if (isReadOnly) {
        console.log("Database is in read-only mode");
        return;
      }

      try {
        await SettingsModel.updateOne(
          {},
          { $pull: { badWords: word } },
          { upsert: true }
        );
        const index = badWords.indexOf(word);
        if (index > -1) {
          badWords.splice(index, 1);
        }
        socket.emit("bad_words_update", badWords);
      } catch (error) {
        console.error("Error deleting bad word:", error);
      }
    });

    socket.on(
      "get_trays",
      async (page: number = 1, dept: string[] = [], degree: string[] = []) => {
        try {
          page = Math.max(1, page);
          const skip = (page - 1) * itemsPerPage;
          const query: any = {};
          if (dept.length) {
            query.dept = { $in: dept };
          }
          if (degree.length) {
            query.degree = { $in: degree };
          }
          const trays = await TrayModel.find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(itemsPerPage);
          const totalCount = await TrayModel.countDocuments(query);
          socket.emit("tray_update", { trays, totalCount });
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
      if (isReadOnly) {
        callback?.({ success: false, error: "Database is in read-only mode" });
        return;
      }

      if (checkBadWords(data.message)) {
        setTimeout(() => {
          callback?.({
            success: false,
            error: "Message cannot contain bad words.",
          });
        }, 1000);
        socket.emit("save_error", {
          message: "Message cannot contain bad words.",
        });
        return;
      }

      setTimeout(() => callback?.({ success: true, preliminary: true }), 1000);

      setTimeout(async () => {
        try {
          const newTray = await TrayModel.create(data);
          const savedTray = await TrayModel.findById(newTray._id);
          io.emit("new_tray", savedTray);
          io.emit("update_total_count", await TrayModel.countDocuments());
        } catch (error: any) {
          socket.emit("save_error", {
            message: error.message || "Error saving tray",
          });
          socket.emit("save_failure", {
            error: error.message || "Error saving tray",
          });
        }
      }, 2000);
    });

    socket.on("delete_tray", async (id: string) => {
      if (isReadOnly) {
        socket.emit("delete_error", {
          message: "Database is in read-only mode",
        });
        return;
      }

      try {
        await TrayModel.deleteOne({ _id: id });
        io.emit("tray_deleted", id);
      } catch (error) {
        console.error("Error deleting tray:", error);
        socket.emit("delete_error", { message: "Error deleting tray" });
      }
    });

    socket.on("toggle_read_only", async (readOnlyStatus: boolean) => {
      try {
        isReadOnly = readOnlyStatus;
        await SettingsModel.findOneAndUpdate(
          {},
          { isReadOnly },
          { upsert: true }
        );
        io.emit("read_only_status", isReadOnly);
        socket.emit("toggle_success", { success: true, isReadOnly });
      } catch (error) {
        console.error("Error toggling read-only status:", error);
        socket.emit("toggle_error", {
          message: "Error toggling read-only status",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
};

export default setupSocketEvents;
