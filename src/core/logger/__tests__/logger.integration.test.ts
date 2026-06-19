/**
 * @jest-environment node
 *
 * Teste de integração real do logger Winston.
 * Sem mocks — valida que as entradas são escritas no ficheiro de log
 * com o formato correto: YYYY-MM-DD HH:mm:ss level: message key=value...
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { createLogger, format, transports } from 'winston';
import { Writable } from 'stream';

// ─── Fábrica isolada para testes (não usa o singleton globalThis) ────────────

function buildTestLogger(logDir: string) {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function serializeMeta(meta: Record<string, unknown>): string {
    return Object.entries(meta)
      .map(([k, v]) => {
        if (v instanceof Error) return `${k}=${v.message}`;
        if (typeof v === 'object' && v !== null) return `${k}=${JSON.stringify(v)}`;
        return `${k}=${String(v)}`;
      })
      .join(' ');
  }

  const logFile = path.join(logDir, 'test-identity-web.log');

  const stream = new Writable({
    write(chunk, _enc, cb) {
      const msg = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk);
      fs.appendFile(logFile, msg, 'utf8', cb);
    },
  });

  const humanFmt = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, service, ...meta }) => {
      const allMeta = service ? { service: String(service), ...meta } : meta;
      const metaStr = serializeMeta(allMeta as Record<string, unknown>);
      const base = `${timestamp} ${level}: ${message}`;
      return metaStr ? `${base} ${metaStr}` : base;
    }),
  );

  return {
    logFile,
    logger: createLogger({
      level: 'debug',
      defaultMeta: { service: 'identity-web' },
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
      ),
      transports: [
        new transports.Stream({ stream, format: humanFmt }),
      ],
    }),
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function waitForFile(filePath: string, minBytes = 1, timeoutMs = 3000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      try {
        const stat = fs.statSync(filePath);
        if (stat.size >= minBytes) return resolve();
      } catch { /* ficheiro ainda não existe */ }
      if (Date.now() - start > timeoutMs) return reject(new Error(`Timeout: ${filePath} não foi criado em ${timeoutMs}ms`));
      setTimeout(check, 50);
    };
    check();
  });
}

function readLastLine(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.trim().split('\n');
  return lines[lines.length - 1].trim();
}

// ─── Testes ─────────────────────────────────────────────────────────────────

describe('Logger — integração real com ficheiro', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'identity-log-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('grava entrada info no ficheiro com formato correto', async () => {
    const { logger, logFile } = buildTestLogger(tmpDir);

    logger.info('Tentativa de login', { context: 'auth.login' });
    await waitForFile(logFile);

    const line = readLastLine(logFile);

    // Formato: "YYYY-MM-DD HH:mm:ss info: Tentativa de login ..."
    expect(line).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} info: Tentativa de login/);
    expect(line).toContain('service=identity-web');
    expect(line).toContain('context=auth.login');
  });

  it('grava entrada error no ficheiro com formato correto', async () => {
    const { logger, logFile } = buildTestLogger(tmpDir);

    logger.error('getDashboard: HTTP 401 GET /v1/dashboard', {
      context: 'dashboard',
      origin: 'client-side',
      status: 401,
      method: 'GET',
      upstreamUrl: '/v1/dashboard',
    });
    await waitForFile(logFile);

    const line = readLastLine(logFile);

    expect(line).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} error: getDashboard: HTTP 401 GET \/v1\/dashboard/);
    expect(line).toContain('service=identity-web');
    expect(line).toContain('context=dashboard');
    expect(line).toContain('origin=client-side');
    expect(line).toContain('status=401');
    expect(line).toContain('method=GET');
    expect(line).toContain('upstreamUrl=/v1/dashboard');
  });

  it('grava múltiplas entradas em sequência sem perder nenhuma', async () => {
    const { logger, logFile } = buildTestLogger(tmpDir);

    logger.info('Linha 1', { context: 'test' });
    logger.warn('Linha 2', { context: 'test' });
    logger.error('Linha 3', { context: 'test' });

    // Aguardar escrita de pelo menos 3 linhas
    await new Promise(resolve => setTimeout(resolve, 500));
    await waitForFile(logFile);

    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.trim().split('\n').filter(Boolean);

    expect(lines).toHaveLength(3);
    expect(lines[0]).toContain('info: Linha 1');
    expect(lines[1]).toContain('warn: Linha 2');
    expect(lines[2]).toContain('error: Linha 3');
  });

  it('inclui service=identity-web em todas as entradas (defaultMeta)', async () => {
    const { logger, logFile } = buildTestLogger(tmpDir);

    logger.debug('teste debug', { context: 'x' });
    logger.info('teste info', { context: 'x' });
    logger.warn('teste warn', { context: 'x' });
    logger.error('teste error', { context: 'x' });

    await new Promise(resolve => setTimeout(resolve, 500));
    await waitForFile(logFile);

    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.trim().split('\n').filter(Boolean);

    for (const line of lines) {
      expect(line).toContain('service=identity-web');
    }
  });

  it('formato de linha corresponde ao esperado da spec', async () => {
    const { logger, logFile } = buildTestLogger(tmpDir);

    logger.error('getDashboard: HTTP 401 GET /v1/dashboard', {
      context: 'dashboard',
      origin: 'client-side',
      status: 401,
      method: 'GET',
      upstreamUrl: '/v1/dashboard',
      response: JSON.stringify({ title: 'Unauthorized' }),
    });
    await waitForFile(logFile);

    const line = readLastLine(logFile);

    // Validar que o formato é legível (não JSON)
    expect(line).not.toMatch(/^\{/);
    // Validar que contém todos os campos esperados em formato key=value
    expect(line).toMatch(/service=identity-web/);
    expect(line).toMatch(/context=dashboard/);
    expect(line).toMatch(/origin=client-side/);
    expect(line).toMatch(/status=401/);
    expect(line).toMatch(/method=GET/);
    expect(line).toMatch(/upstreamUrl=\/v1\/dashboard/);
    expect(line).toMatch(/response=\{"title":"Unauthorized"\}/);
  });
});
