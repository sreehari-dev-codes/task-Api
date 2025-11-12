import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerDoc from "./docs/swagger.json";
import logger from "./utils/logger";
import { redisRateLimitStore } from "./middlewares/rateLimiter.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));

const windowMin = Number(process.env.RATE_LIMIT_WINDOW_MIN || 15);
const maxReq = Number(process.env.RATE_LIMIT_MAX || 100);

app.use(
  rateLimit({
    windowMs: windowMin * 60 * 1000,
    max: maxReq,
    standardHeaders: true,
    legacyHeaders: false,
    store: redisRateLimitStore()
  })
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api", routes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

export default app;
