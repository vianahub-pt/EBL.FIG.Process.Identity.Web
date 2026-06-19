/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Mock do logger para evitar instanciar winston durante testes
jest.mock('@/core/logger/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}));

import { logger } from '@/core/logger/logger';
import { POST } from '../route';

const mockLoggerError = logger.error as jest.MockedFunction<typeof logger.error>;
const mockLoggerWarn = logger.warn as jest.MockedFunction<typeof logger.warn>;
const mockLoggerInfo = logger.info as jest.MockedFunction<typeof logger.info>;

function makeRequest(body: unknown, host = 'localhost:3000'): NextRequest {
  return new NextRequest('http://localhost:3000/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host,
    },
    body: JSON.stringify(body),
  });
}

describe('POST /api/log', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Cenário de sucesso', () => {
    it('retorna 200 { ok: true } e chama logger.error com level=error', async () => {
      const req = makeRequest({ level: 'error', message: 'Falhou', context: 'dashboard' });
      const res = await POST(req);
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body).toEqual({ ok: true });
      expect(mockLoggerError).toHaveBeenCalledWith(
        'Falhou',
        expect.objectContaining({ origin: 'client-side', context: 'dashboard' }),
      );
    });

    it('retorna 200 e chama logger.warn com level=warn', async () => {
      const req = makeRequest({ level: 'warn', message: 'Aviso', context: 'auth' });
      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(mockLoggerWarn).toHaveBeenCalledWith(
        'Aviso',
        expect.objectContaining({ origin: 'client-side', context: 'auth' }),
      );
    });

    it('retorna 200 e chama logger.info com level=info', async () => {
      const req = makeRequest({ level: 'info', message: 'Informação', context: 'apps' });
      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        'Informação',
        expect.objectContaining({ origin: 'client-side' }),
      );
    });

    it('inclui campos de meta permitidos na chamada ao logger', async () => {
      const req = makeRequest({
        level: 'error',
        message: 'Erro de rede',
        context: 'api',
        errorMessage: 'Network timeout',
        url: 'https://app.local/dashboard',
      });
      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(mockLoggerError).toHaveBeenCalledWith(
        'Erro de rede',
        expect.objectContaining({
          origin: 'client-side',
          context: 'api',
          errorMessage: 'Network timeout',
          url: 'https://app.local/dashboard',
        }),
      );
    });

    it('ignora silenciosamente campos de meta não permitidos', async () => {
      const req = makeRequest({
        level: 'error',
        message: 'Falhou',
        context: 'test',
        campoNaoPermitido: 'injeção',
      });
      const res = await POST(req);
      const resBody = await res.json();

      expect(res.status).toBe(200);
      expect(resBody).toEqual({ ok: true });
      expect(mockLoggerError).toHaveBeenCalledWith(
        'Falhou',
        expect.not.objectContaining({ campoNaoPermitido: 'injeção' }),
      );
    });
  });

  describe('Cenário de insucesso — payload inválido', () => {
    it('retorna 400 quando level é inválido', async () => {
      const req = makeRequest({ level: 'debug', message: 'msg' });
      const res = await POST(req);
      expect(res.status).toBe(400);
      expect(mockLoggerError).not.toHaveBeenCalled();
    });

    it('retorna 400 quando message está ausente', async () => {
      const req = makeRequest({ level: 'error', context: 'test' });
      const res = await POST(req);
      expect(res.status).toBe(400);
      expect(mockLoggerError).not.toHaveBeenCalled();
    });

    it('retorna 400 quando message é string vazia', async () => {
      const req = makeRequest({ level: 'error', message: '' });
      const res = await POST(req);
      expect(res.status).toBe(400);
      expect(mockLoggerError).not.toHaveBeenCalled();
    });

    it('retorna 400 quando body não é JSON válido', async () => {
      const req = new NextRequest('http://localhost:3000/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', host: 'localhost:3000' },
        body: 'não é json',
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      expect(mockLoggerError).not.toHaveBeenCalled();
    });

    it('retorna 400 quando body não é objeto', async () => {
      const req = makeRequest('string não é objeto');
      const res = await POST(req);
      expect(res.status).toBe(400);
      expect(mockLoggerError).not.toHaveBeenCalled();
    });
  });

  describe('Cenário de borda — host externo', () => {
    it('retorna 403 quando header host não corresponde ao esperado', async () => {
      const req = makeRequest(
        { level: 'error', message: 'msg', context: 'test' },
        'externo.malicioso.com',
      );
      const res = await POST(req);
      expect(res.status).toBe(403);
      expect(mockLoggerError).not.toHaveBeenCalled();
    });
  });
});


