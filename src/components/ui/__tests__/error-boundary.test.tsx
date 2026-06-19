import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../error-boundary';

jest.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

global.fetch = jest.fn().mockResolvedValue({ ok: true });

function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }): React.ReactElement {
  if (shouldThrow) {
    throw new Error('Test render error');
  }
  return <div data-testid="child-content">Conteúdo filho</div>;
}

let controlledShouldThrow = true;
function ControlledThrowingComponent(): React.ReactElement {
  if (controlledShouldThrow) {
    throw new Error('Controlled render error');
  }
  return <div data-testid="controlled-content">Conteúdo recuperado</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza os filhos quando não há erro', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Conteúdo filho')).toBeInTheDocument();
  });

  it('exibe o fallback padrão quando um filho lança erro', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('errors.boundary.title')).toBeInTheDocument();
    expect(screen.getByText('errors.boundary.retry')).toBeInTheDocument();
  });

  it('envia POST /api/log quando captura um erro de renderização', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/log',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"level":"error"'),
      })
    );

    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(callBody.context).toBe('ui');
    expect(callBody.message).toContain('Test render error');
  });

  it('exibe fallback customizado quando prop fallback é fornecida', () => {
    render(
      <ErrorBoundary fallback={<div>Fallback customizado</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Fallback customizado')).toBeInTheDocument();
    expect(screen.queryByText('errors.boundary.title')).not.toBeInTheDocument();
  });

  it('limpa o estado de erro e re-renderiza filhos ao clicar em "Tentar novamente"', () => {
    controlledShouldThrow = true;

    render(
      <ErrorBoundary>
        <ControlledThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('errors.boundary.retry')).toBeInTheDocument();

    controlledShouldThrow = false;
    fireEvent.click(screen.getByText('errors.boundary.retry'));

    expect(screen.getByTestId('controlled-content')).toBeInTheDocument();
  });
});
