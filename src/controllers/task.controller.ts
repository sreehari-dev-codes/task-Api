import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import ApiError from "../utils/ApiError";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const data = { ...req.body, user: req.user.id };
    const task = await Task.create(data);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const id = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true, runValidators: true });
    if (!task) return next(new ApiError(404, "Task not found"));
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const id = req.params.id;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
    if (!task) return next(new ApiError(404, "Task not found"));
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
