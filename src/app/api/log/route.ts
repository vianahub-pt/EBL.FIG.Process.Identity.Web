import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/core/logger/logger';

const ALLOWED_LEVELS = ['error', 'warn', 'info'] as const;
type LogLevel = (typeof ALLOWED_LEVELS)[number];

const ALLOWED_META_KEYS = [
  'context',
  'errorMessage',
  'errorStack',
  'url',
  'timestamp',
  'status',
  'method',
  'upstreamUrl',
  'response',
  'stack',
] as const;
const META_MAX_LENGTH: Record<string, number> = { errorStack: 2000, response: 1000, stack: 2000 };
const DEFAULT_MAX_LENGTH = 500;

function sanitize(value: unknown, maxLength = DEFAULT_MAX_LENGTH): string {
  return String(value).trim().slice(0, maxLength);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const host = request.headers.get('host') ?? '';
  const expectedHost = request.nextUrl.host;
  if (host !== expectedHost) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { level, message, ...meta } = body as Record<string, unknown>;

  if (!ALLOWED_LEVELS.includes(level as LogLevel)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof message !== 'string' || message.trim() === '') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const safeMessage = sanitize(message);
  const safeMeta: Record<string, unknown> = { origin: 'client-side' };

  for (const key of ALLOWED_META_KEYS) {
    const val = meta[key];
    if (typeof val === 'string') {
      safeMeta[key] = sanitize(val, META_MAX_LENGTH[key] ?? DEFAULT_MAX_LENGTH);
    } else if (typeof val === 'number') {
      safeMeta[key] = val;
    }
  }

  logger[level as LogLevel](safeMessage, safeMeta);

  return NextResponse.json({ ok: true }, { status: 200 });
}

