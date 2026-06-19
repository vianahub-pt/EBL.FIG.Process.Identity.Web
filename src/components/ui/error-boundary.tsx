'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryBaseProps {
  children: ReactNode;
  fallback?: ReactNode;
  title: string;
  description: string;
  retryLabel: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundaryBase extends Component<ErrorBoundaryBaseProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryBaseProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const stackLines = (info.componentStack ?? '')
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .slice(0, 3)
      .join('\n');

    const message = `${error.message} | ${stackLines}`;

    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level: 'error', context: 'ui', message }),
    }).catch(() => undefined);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/40 bg-destructive/5 p-8 text-center"
        >
          <p className="text-lg font-semibold text-destructive">
            {this.props.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {this.props.description}
          </p>
          <Button variant="outline" onClick={this.handleRetry}>
            {this.props.retryLabel}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps): ReactNode {
  const t = useTranslations('errors.boundary');
  return (
    <ErrorBoundaryBase
      title={t('title')}
      description={t('description')}
      retryLabel={t('retry')}
      fallback={fallback}
    >
      {children}
    </ErrorBoundaryBase>
  );
}

export default ErrorBoundary;
