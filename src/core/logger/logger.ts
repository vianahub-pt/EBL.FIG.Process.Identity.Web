import fs from "fs";
import path from "path";
import { Writable } from "stream";
import { createLogger, format, transports, type Logger } from "winston";

const LOG_DIRECTORY = path.join(process.cwd(), "logs");

export function ensureLogDirectory() {
  if (!fs.existsSync(LOG_DIRECTORY)) {
    fs.mkdirSync(LOG_DIRECTORY, { recursive: true });
  }
}

function getCurrentLogFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}-identity-web.log`;
}

function createDailyLogStream() {
  return new Writable({
    write(chunk, _encoding, callback) {
      ensureLogDirectory();
      const message = Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
      fs.appendFile(
        path.join(LOG_DIRECTORY, getCurrentLogFileName()),
        message,
        "utf8",
        callback,
      );
    },
  });
}

function serializeMeta(meta: Record<string, unknown>): string {
  const entries = Object.entries(meta);
  if (entries.length === 0) return "";
  return entries
    .map(([key, value]) => {
      if (value instanceof Error) return `${key}=${value.message}`;
      if (typeof value === "object" && value !== null) return `${key}=${JSON.stringify(value)}`;
      return `${key}=${String(value)}`;
    })
    .join(" ");
}

const humanReadableFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, service, ...meta }) => {
    const allMeta = service ? { service: String(service), ...meta } : meta;
    const metaStr = serializeMeta(allMeta as Record<string, unknown>);
    const base = `${timestamp} ${level}: ${message}`;
    return metaStr ? `${base} ${metaStr}` : base;
  }),
);

function createWinstonLogger() {
  ensureLogDirectory();

  return createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    defaultMeta: { service: "identity-web" },
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json(),
    ),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.printf(({ timestamp, level, message, service, ...meta }) => {
            const allMeta = service ? { service: String(service), ...meta } : meta;
            const metaStr = serializeMeta(allMeta as Record<string, unknown>);
            const base = `${timestamp} ${level}: ${message}`;
            return metaStr ? `${base} ${metaStr}` : base;
          }),
        ),
      }),
      new transports.Stream({
        stream: createDailyLogStream(),
        format: humanReadableFormat,
      }),
    ],
  });
}

declare global {
  // eslint-disable-next-line no-var
  var geritLogger: Logger | undefined;
}

export const logger = globalThis.geritLogger ?? createWinstonLogger();

if (process.env.NODE_ENV !== "production") {
  globalThis.geritLogger = logger;
}

export function redactEmail(email: string): string {
  const [localPart, domainPart] = email.split("@");
  if (!localPart || !domainPart) return "*";
  const visiblePrefix = localPart.slice(0, 2);
  return `${visiblePrefix}${"*".repeat(Math.max(localPart.length - 2, 1))}@${domainPart}`;
}

// Compat: helper para logs com contexto fixo (usado em proxy.ts e outros)
// Formata uma linha de log — partilhada com route.ts e consumidores legados
export function formatLogLine(level: string, context: string, message: string): string {
  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").substring(0, 19);
  const paddedLevel = level.toUpperCase().padEnd(5);
  const ctx = `[${context.trim().padEnd(5)}]`;
  return `[${timestamp}] [${paddedLevel}] ${ctx} ${message.trim()}\n`;
}

export const createContextLogger = (context: string) => ({
  debug: (msg: string) => logger.debug(msg, { context }),
  info: (msg: string) => logger.info(msg, { context }),
  warn: (msg: string) => logger.warn(msg, { context }),
  error: (msg: string) => logger.error(msg, { context }),
});
