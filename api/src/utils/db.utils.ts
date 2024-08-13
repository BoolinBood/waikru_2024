import mongoose from "mongoose";
import dotenv from "dotenv";

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

export default connectToMongoDB;
