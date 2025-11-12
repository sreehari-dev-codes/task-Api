import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app";

describe("Auth API", () => {
  it("registers a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });
    assert.strictEqual(res.statusCode, 201);
  });
});
