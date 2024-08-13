"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const badWords_utils_1 = require("../utils/badWords.utils");
const tray_model_1 = __importDefault(require("../models/tray.model"));
const itemsPerPage = 4;
const setupSocketEvents = (io) => {
    io.on("connection", (socket) => {
        console.log(`A client connected with ID: ${socket.id}`);
        socket.emit("server_status", {
            isConnected: true,
            dbConnected: true,
        });
        socket.on("get_trays", async (page = 1, dept = []) => {
            try {
                page = Math.max(1, page);
                const skip = (page - 1) * itemsPerPage;
                const query = Array.isArray(dept) && dept.length > 0 ? { dept } : {};
                const trays = await tray_model_1.default.find(query)
                    .sort({ _id: -1 })
                    .skip(skip)
                    .limit(itemsPerPage);
                const totalCount = await tray_model_1.default.countDocuments(query);
                socket.emit("tray_update", { trays, totalCount });
            }
            catch (error) {
                console.error("Error fetching trays:", error);
                socket.emit("fetch_error", { message: "Error fetching trays" });
            }
        });
        socket.on("get_all_trays", async () => {
            try {
                const trays = await tray_model_1.default.find().sort({ _id: -1 });
                socket.emit("tray_update", trays);
            }
            catch (error) {
                console.error("Error fetching trays:", error);
                socket.emit("fetch_error", { message: "Error fetching trays" });
            }
        });
        socket.on("save_tray", async (data, callback) => {
            if ((0, badWords_utils_1.checkBadWords)(data.message)) {
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
                    const newTray = await tray_model_1.default.create(data);
                    const savedTray = await tray_model_1.default.findById(newTray._id);
                    io.emit("new_tray", savedTray);
                    io.emit("update_total_count", await tray_model_1.default.countDocuments());
                }
                catch (error) {
                    socket.emit("save_error", {
                        message: error.message || "Error saving tray",
                    });
                    socket.emit("save_failure", {
                        error: error.message || "Error saving tray",
                    });
                }
            }, 2000);
        });
        socket.on("delete_tray", async (id) => {
            try {
                await tray_model_1.default.deleteOne({ _id: id });
                io.emit("tray_deleted", id);
            }
            catch (error) {
                console.error("Error deleting tray:", error);
                socket.emit("delete_error", { message: "Error deleting tray" });
            }
        });
        socket.on("disconnect", () => {
            console.log("A client disconnected");
        });
    });
};
exports.default = setupSocketEvents;
