import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGODB_URI!;

if (!mongoUrl) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}
const connectToMongoDB = async (): Promise<boolean> => {
    try {
      await mongoose.connect(mongoUrl);
      return true;
    } catch (err) {
      return false;
    }
  };

export default connectToMongoDB;