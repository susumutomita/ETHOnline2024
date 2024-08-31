import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.timestamp(),
    const safeStringify = (obj) => {
      try {
        return JSON.stringify(obj, null, 2);
      } catch (error) {
        return 'Error in metadata serialization';
      }
    };

    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? safeStringify(meta)
        : "";
      return `${timestamp} [${level}]: ${message} ${metaString}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

export default logger;
