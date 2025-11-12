import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";
import logger from "./utils/logger";

const PORT = Number(process.env.PORT || 3000);

(async function start() {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/taskdb");
    await connectRedis(process.env.REDIS_URL);
    app.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("Startup failed: " + (err as Error).message);
    process.exit(1);
  }
})();
