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
    return true;
  } catch (err) {
    return false;
  }
};

export default connectToMongoDB;
