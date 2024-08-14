import mongoose from "mongoose";
import dotenv from "dotenv";
import SettingsModel from "../models/setting.model";

dotenv.config();

const mongoUrl = process.env.MONGO_URL!;

// const isProduction = process.env.NODE_ENV === 'production';
// const mongoUrl = isProduction ? process.env.MONGO_URL : process.env.MONGODB_URI;

if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}
const connectToMongoDB = async (): Promise<boolean> => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected: true");
    return true;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    return false;
  }
};

export const loadStatus = async () => {
  try {
    const status = await SettingsModel.findOne();

    if (status) {
      console.log("Read-only status loaded:", status.isReadOnly);
      return status.isReadOnly;
    }
  } catch (error) {
    console.log("Error loading status:", error);
    return false;
  }
};

export const loadBadwords = async () => {
  try {
    const status = await SettingsModel.findOne();

    if (status) {
      console.log("Badwords loaded:", status.badWords);
      return status.badWords;
    }
  } catch (error) {
    console.log("Error loading badwords:", error);
    return [];
  }
};

export default connectToMongoDB;
