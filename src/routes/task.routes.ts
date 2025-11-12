import { Router } from "express";
import * as ctrl from "../controllers/task.controller";
import auth from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator";

const router = Router();

router.post("/", auth, validateBody(createTaskSchema), ctrl.createTask);
router.get("/", auth, ctrl.getTasks);
router.put("/:id", auth, validateBody(updateTaskSchema), ctrl.updateTask);
router.delete("/:id", auth, ctrl.deleteTask);

export default router;
    