import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import ApiError from "../utils/ApiError";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) throw new ApiError(401, "No token provided");
    const token = auth.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    req.token = token;
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
