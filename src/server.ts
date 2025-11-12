import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { createClient } from "redis";
import logger from "./utils/logger";

const PORT = Number(process.env.PORT) || 3000;

async function connectRedis() {
  let redisClient;

  if (process.env.REDIS_URL) {
    // Use full Redis URL if provided
    redisClient = createClient({ url: process.env.REDIS_URL });
  } else {
    // Fallback to individual host/port/password
    const redisHost = process.env.REDIS_HOST;
    const redisPort = Number(process.env.REDIS_PORT);
    const redisUsername = process.env.REDIS_USERNAME;
    const redisPassword = process.env.REDIS_PASSWORD;

    if (!redisHost || isNaN(redisPort) || !redisPassword) {
      throw new Error(
        `Invalid Redis environment variables: 
REDIS_HOST=${redisHost}, REDIS_PORT=${process.env.REDIS_PORT}, REDIS_PASSWORD=${!!redisPassword}`
      );
    }

    redisClient = createClient({
      username: redisUsername,
      password: redisPassword,
      socket: {
        host: redisHost,
        port: redisPort,
      },
    });
  }

  redisClient.on("error", (err) => logger.error("Redis error: " + err));
  redisClient.on("connect", () => logger.info("Redis connected successfully"));

  await redisClient.connect();
  return redisClient;
}

(async function start() {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/taskdb");

    await connectRedis();

    app.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("Startup failed: " + (err as Error).message);
    process.exit(1);
  }
})();
