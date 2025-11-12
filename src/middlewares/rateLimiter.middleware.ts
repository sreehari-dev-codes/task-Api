import RedisStore from "rate-limit-redis";
import { getRedisClient } from "../config/redis";

export const redisRateLimitStore = () => {
  const client = getRedisClient();
  if (!client) return undefined;
  return new RedisStore({
    sendCommand: (...args: any[]) => (client as any).sendCommand(args)
  }) as any;
};
