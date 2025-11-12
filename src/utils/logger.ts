import winston from "winston";

const { combine, timestamp, printf } = winston.format;
const fmt = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(timestamp(), fmt),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "logs/app.log" })]
});

export default logger;
