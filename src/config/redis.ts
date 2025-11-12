import { createClient, type RedisClientType } from "redis";
import logger from "../utils/logger";

let client: RedisClientType | null = null;

export const connectRedis = async (url?: string) => {
  if (!url) {
    logger.info("No REDIS_URL provided — skipping Redis connect");
    return null;
  }
  client = createClient({ url });
  client.on("error", (err) => logger.error("Redis error: " + err));
  await client.connect();
  logger.info("Redis connected");
  return client;
};

export const getRedisClient = () => client;
