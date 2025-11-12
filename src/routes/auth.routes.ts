import { Router } from "express";
import * as ctrl from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.get("/me", auth, ctrl.me);
router.post("/logout", auth, ctrl.logout);

export default router;
