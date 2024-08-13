"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_utils_1 = __importDefault(require("./utils/db.utils"));
const socket_event_1 = __importDefault(require("./sockets/socket.event"));
dotenv_1.default.config();
const isDevelopment = process.env.NODE_ENV !== "production";
const hostname = isDevelopment ? "0.0.0.0" : "10.4.56.60";
const port = 3000;
// Initialize Express app
const app = (0, express_1.default)();
// Optional: Add middleware to parse request body
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const startServer = async () => {
    try {
        const httpServer = (0, http_1.createServer)(app);
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*",
            },
        });
        (0, socket_event_1.default)(io);
        httpServer.listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
        httpServer.once("error", (err) => {
            console.error(err);
            process.exit(1);
        });
    }
    catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
};
(0, db_utils_1.default)()
    .then((isConnected) => {
    console.log("MongoDB connected:", isConnected);
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
startServer();
