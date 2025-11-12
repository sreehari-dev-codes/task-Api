import mongoose from "mongoose";
import logger from "../utils/logger";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error: " + (err as Error).message);
    throw err;
  }
};
