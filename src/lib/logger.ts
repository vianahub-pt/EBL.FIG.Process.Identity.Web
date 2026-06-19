// Re-exporta de @/core/logger para compatibilidade com importações legadas
export {
  logger,
  redactEmail,
  createContextLogger,
  ensureLogDirectory,
  formatLogLine,
} from "../core/logger/logger";

import { logger as _logger } from "../core/logger/logger";
export default _logger;

