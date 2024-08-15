import { Server, Socket } from "socket.io";
import SettingsModel from "../models/setting.model";
import {
  addBadWord as handleAddBadWord,
  badWords,
  checkBadWords,
} from "../utils/badWords.utils";
import TrayModel from "../models/tray.model";

const itemsPerPage = 4;

export const emitSettings = async (
  socket: Socket,
  isReadOnly: boolean,
  badWords: string[]
) => {
  socket.emit("read_only_status", isReadOnly);
  socket.emit("bad_words_update", badWords);
};

export const addBadWord = async (word: string, isReadOnly: boolean) => {
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

    handleAddBadWord(word);
  } catch (error) {
    console.error("Error adding bad word:", error);
  }
};

export const removeBadWord = async (
  socket: Socket,
  word: string,
  isReadOnly: boolean
) => {
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
};

export const fetchAllTrays = async (socket: Socket, callback: any) => {
  try {
    const trays = await TrayModel.find().sort({ _id: -1 });
    socket.emit("tray_update", trays);
    callback?.({ trays });
  } catch (error) {
    console.error("Error fetching trays:", error);
  }
};

export const fetchTraysByDeptAndPage = async (
  socket: Socket,
  page: number,
  dept: string[],
  degree: string[],
  callback: any
) => {
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
    // socket.emit("tray_update", { trays, totalCount });
    return callback?.({ trays, totalCount });
  } catch (error) {
    console.error("Error fetching trays:", error);
  }
};

export const saveTray = async (
  io: Server,
  socket: Socket,
  data: TrayType,
  isReadOnly: boolean,
  callback: any
) => {
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
    }
  }, 2000);
};

export const deleteTray = async (
  io: Server,
  socket: Socket,
  id: string,
  isReadOnly: boolean
) => {
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
};

export const toggleReadOnly = async (
  io: Server,
  socket: Socket,
  isReadOnly: boolean
) => {
  try {
    await SettingsModel.findOneAndUpdate({}, { isReadOnly }, { upsert: true });
    io.emit("read_only_status", isReadOnly);
    socket.emit("toggle_success", { success: true, isReadOnly });
  } catch (error) {
    console.error("Error toggling read-only status:", error);
  }
};
