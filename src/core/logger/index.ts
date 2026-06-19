// Server-only exports — não importar 'client-logger' aqui para não poluir o grafo do servidor
export { logger, redactEmail, createContextLogger, formatLogLine, ensureLogDirectory } from "./logger";

// Client-side: importar directamente de '@/core/logger/client-logger'
// para evitar que "use client" contamine módulos server-side (API routes, proxy)
export { logError } from "./client-logger";
