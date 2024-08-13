"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUrl = process.env.MONGO_URL;
// const isProduction = process.env.NODE_ENV === 'production';
// const mongoUrl = isProduction ? process.env.MONGO_URL : process.env.MONGODB_URI;
if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the environment variables");
}
const connectToMongoDB = async () => {
    try {
        await mongoose_1.default.connect(mongoUrl);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.default = connectToMongoDB;
