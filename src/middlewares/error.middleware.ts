import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import logger from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message || err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ success: false, message: err.message });
  }
  res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" });
};
