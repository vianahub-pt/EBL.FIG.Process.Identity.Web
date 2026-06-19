/**
 * @jest-environment node
 *
 * Teste de integração real do route handler POST /api/log.
 * Sem mocks do logger — valida que o handler escreve no ficheiro de log
 * com o formato e conteúdo corretos.
 *
 * NOTA: escreve no ficheiro de log real da aplicação (logs/YYYYMMDD-identity-web.log).
 * Cada execução adiciona linhas marcadas com [integration-test] para fácil identificação.
 */

import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');

function getCurrentLogFileName(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}${m}${d}-identity-web.log`;
}

function getLogFilePath(): string {
  return path.join(LOG_DIR, getCurrentLogFileName());
}

function readLogLines(): string[] {
  const filePath = getLogFilePath();
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean);
}

async function waitForNewLine(previousCount: number, timeoutMs = 3000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const lines = readLogLines();
    if (lines.length > previousCount) {
      return lines[lines.length - 1].trim();
    }
    await new Promise(r => setTimeout(r, 50));
  }
  throw new Error(`Nenhuma nova linha no log em ${timeoutMs}ms`);
}

function makeRequest(body: unknown, host = 'localhost:3000'): NextRequest {
  return new NextRequest('http://localhost:3000/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', host },
    body: JSON.stringify(body),
  });
}

describe('POST /api/log — integração real com ficheiro de log', () => {
  // Importar POST após a configuração do ambiente
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    // Importar o handler real (sem mocks)
    const mod = await import('../route');
    POST = mod.POST;

    // Garantir que o diretório de logs existe
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  });

  it('grava erro de dashboard no ficheiro com todos os campos esperados', async () => {
    const previousCount = readLogLines().length;

    const req = makeRequest({
      level: 'error',
      message: '[integration-test] getDashboard: HTTP 401 GET /v1/dashboard',
      context: 'dashboard',
      origin: 'client-side',
      status: 401,
      method: 'GET',
      upstreamUrl: '/v1/dashboard',
      response: JSON.stringify({ title: 'Unauthorized' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const line = await waitForNewLine(previousCount);

    // Formato: "YYYY-MM-DD HH:mm:ss error: [integration-test] getDashboard: HTTP 401..."
    expect(line).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} error:/);
    expect(line).toContain('[integration-test] getDashboard: HTTP 401 GET /v1/dashboard');
    expect(line).toContain('service=identity-web');
    expect(line).toContain('origin=client-side');
    expect(line).toContain('context=dashboard');
    expect(line).toContain('status=401');
    expect(line).toContain('method=GET');
    expect(line).toContain('upstreamUrl=/v1/dashboard');
  });

  it('grava warning no ficheiro com formato correto', async () => {
    const previousCount = readLogLines().length;

    const req = makeRequest({
      level: 'warn',
      message: '[integration-test] token prestes a expirar',
      context: 'auth.refresh',
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const line = await waitForNewLine(previousCount);

    expect(line).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} warn:/);
    expect(line).toContain('[integration-test] token prestes a expirar');
    expect(line).toContain('service=identity-web');
    expect(line).toContain('origin=client-side');
    expect(line).toContain('context=auth.refresh');
  });

  it('não grava nada quando o payload é inválido', async () => {
    const previousCount = readLogLines().length;

    const req = makeRequest({ level: 'debug', message: 'should not appear' });
    const res = await POST(req);

    expect(res.status).toBe(400);

    // Aguardar brevemente para garantir que não há escrita
    await new Promise(r => setTimeout(r, 200));
    expect(readLogLines().length).toBe(previousCount);
  });

  it('formato final corresponde ao modelo do Gerit Web', async () => {
    const previousCount = readLogLines().length;

    const req = makeRequest({
      level: 'error',
      message: '[integration-test] getDashboard: HTTP 401 GET /v1/dashboard',
      context: 'dashboard',
      origin: 'client-side',
      status: 401,
      method: 'GET',
      upstreamUrl: '/v1/dashboard',
      response: '{"title":"Unauthorized"}',
    });

    await POST(req);
    const line = await waitForNewLine(previousCount);

    // O formato deve ser legível (não JSON) e seguir o padrão do Gerit Web
    expect(line).not.toMatch(/^\{/);
    // Verificar ordem esperada: timestamp level: message service=... context=... origin=... status=... method=... upstreamUrl=... response=...
    const pattern = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} error:.*service=identity-web.*origin=client-side.*context=dashboard.*status=401.*method=GET.*upstreamUrl=\/v1\/dashboard/;
    expect(line).toMatch(pattern);
  });
});
