declare module "rate-limit-redis" {
  import { Store } from "express-rate-limit";

  interface RedisStoreOptions {
    sendCommand: (...args: string[]) => Promise<unknown>;
  }

  export default class RedisStore extends Store {
    constructor(options: RedisStoreOptions);
  }
}
