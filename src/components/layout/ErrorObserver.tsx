'use client';

import { useEffect } from 'react';

export function ErrorObserver(): null {
  useEffect(() => {
    const previousOnError = window.onerror;
    const previousOnUnhandledRejection = window.onunhandledrejection;

    window.onerror = (message, source, lineno, colno, error): boolean => {
      const logMessage = `${String(message)}: ${source ?? ''}:${lineno ?? ''}`;

      void fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'error', context: 'global', message: logMessage }),
      }).catch(() => undefined);

      if (typeof previousOnError === 'function') {
        return previousOnError(message, source, lineno, colno, error);
      }

      return false;
    };

    window.onunhandledrejection = (event: PromiseRejectionEvent): void => {
      const reason =
        event.reason instanceof Error
          ? event.reason.message
          : String(event.reason ?? 'unknown');

      const logMessage = `UnhandledRejection: ${reason}`;

      void fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'error', context: 'global', message: logMessage }),
      }).catch(() => undefined);

      if (typeof previousOnUnhandledRejection === 'function') {
        previousOnUnhandledRejection.call(window, event);
      }
    };

    return () => {
      window.onerror = previousOnError;
      window.onunhandledrejection = previousOnUnhandledRejection;
    };
  }, []);

  return null;
}
