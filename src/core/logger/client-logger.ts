"use client";

type LogLevel = "error" | "warn" | "info";

function extractErrorInfo(error: unknown): Record<string, string> {
  if (error instanceof Error) {
    return {
      errorMessage: error.message,
      ...(error.stack ? { errorStack: error.stack } : {}),
    };
  }
  return { errorMessage: String(error) };
}

export async function logError(
  context: string,
  message: string,
  error?: unknown,
  extra?: Record<string, unknown>,
): Promise<void> {
  const level: LogLevel = "error";
  const errorInfo = error !== undefined ? extractErrorInfo(error) : {};

  console.error(`[${context}] ${message}`, error ?? "");

  const body: Record<string, unknown> = {
    level,
    message,
    context,
    ...errorInfo,
    ...extra,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : undefined,
  };

  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Logging nunca quebra a UX
  }
}
