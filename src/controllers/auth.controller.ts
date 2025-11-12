import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import ApiError from "../utils/ApiError";
import { signToken } from "../utils/token";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return next(new ApiError(409, "Email already registered"));
    const user = await User.create({ name, email, password });
    const token = signToken({ id: user._id.toString(), email: user.email });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return next(new ApiError(401, "Invalid credentials"));
    const token = signToken({ id: user._id.toString(), email: user.email });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.token;
  if (token) {
    const client = (await import("../config/redis")).getRedisClient();
    if (client) {
      const decoded: any = (await import("jsonwebtoken")).decode(token);
      if (decoded?.exp) {
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) await client.setEx(`bl_${token}`, ttl, "1");
      }
    }
  }
  res.json({ message: "Logged out" });
};
