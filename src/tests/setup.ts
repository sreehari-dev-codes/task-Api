import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
});
function beforeAll(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}

function afterAll(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}

