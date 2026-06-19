import React from 'react';
import { render, act } from '@testing-library/react';
import { ErrorObserver } from '../ErrorObserver';

global.fetch = jest.fn().mockResolvedValue({ ok: true });

describe('ErrorObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.onerror = null;
    window.onunhandledrejection = null;
  });

  it('regista window.onerror ao montar', () => {
    render(<ErrorObserver />);
    expect(window.onerror).toBeInstanceOf(Function);
  });

  it('regista window.onunhandledrejection ao montar', () => {
    render(<ErrorObserver />);
    expect(window.onunhandledrejection).toBeInstanceOf(Function);
  });

  it('remove os listeners ao desmontar (cleanup)', () => {
    const { unmount } = render(<ErrorObserver />);
    unmount();
    expect(window.onerror).toBeNull();
    expect(window.onunhandledrejection).toBeNull();
  });

  it('restaura listener anterior de window.onerror ao desmontar', () => {
    const previousHandler = jest.fn();
    window.onerror = previousHandler;

    const { unmount } = render(<ErrorObserver />);
    expect(window.onerror).not.toBe(previousHandler);

    unmount();
    expect(window.onerror).toBe(previousHandler);
  });

  it('envia POST /api/log ao disparar window.onerror', () => {
    render(<ErrorObserver />);

    act(() => {
      window.onerror!('TypeError: x is not a function', 'app.js', 42, 5, new Error('x'));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/log',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"context":"global"'),
      })
    );

    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(callBody.level).toBe('error');
    expect(callBody.message).toContain('TypeError: x is not a function');
  });

  it('envia POST /api/log ao disparar window.onunhandledrejection', () => {
    render(<ErrorObserver />);

    const mockEvent = {
      reason: new Error('async failure'),
    } as PromiseRejectionEvent;

    act(() => {
      window.onunhandledrejection!(mockEvent);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/log',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('UnhandledRejection'),
      })
    );

    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(callBody.level).toBe('error');
    expect(callBody.context).toBe('global');
    expect(callBody.message).toContain('async failure');
  });
});
