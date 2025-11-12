import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { createClient } from "redis";
import logger from "./utils/logger";

const PORT = Number(process.env.PORT || 3000);

async function connectRedis() {
  const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  redisClient.on("error", (err) => logger.error("Redis error: " + err));
  redisClient.on("connect", () => logger.info("Redis connected successfully"));

  await redisClient.connect();
  return redisClient;
}

(async function start() {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/taskdb");

    const redisClient = await connectRedis();

    app.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("Startup failed: " + (err as Error).message);
    process.exit(1);
  }
})();
