"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trayModelSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    flower: { type: String, required: true },
    dept: { type: String, required: true },
});
const TrayModel = mongoose_1.default.models.Tray || mongoose_1.default.model("Tray", trayModelSchema);
exports.default = TrayModel;
