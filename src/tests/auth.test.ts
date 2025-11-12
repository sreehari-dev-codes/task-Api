import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import User from "../models/User"; 

describe("Auth API - Production Level Tests", () => {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  };

  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user and return JWT", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("email", userData.email);
    expect(res.body.user).not.toHaveProperty("password"); 
  });

  it("should not allow registration with an existing email", async () => {
    await request(app).post("/api/auth/register").send(userData);

    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should login a registered user", async () => {
    await request(app).post("/api/auth/register").send(userData);

    const res = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with wrong password", async () => {
    await request(app).post("/api/auth/register").send(userData);

    const res = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should get current user info with valid JWT", async () => {
    const registerRes = await request(app).post("/api/auth/register").send(userData);
    const token = registerRes.body.token;

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", userData.email);
  });

  it("should not get user info with invalid JWT", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer invalidtoken`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
