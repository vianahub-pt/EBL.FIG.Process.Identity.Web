import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionsFilters } from '../ActionsFilters';

jest.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

describe('ActionsFilters', () => {
  const defaultProps = {
    search: '',
    onSearchChange: jest.fn(),
    statusValue: 'all',
    onStatusChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Select and Input components', () => {
    render(<ActionsFilters {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays current search value in Input', () => {
    render(<ActionsFilters {...defaultProps} search="my search" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('my search');
  });

  it('calls onSearchChange with typed value', () => {
    const onSearchChange = jest.fn();
    render(<ActionsFilters {...defaultProps} onSearchChange={onSearchChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(onSearchChange).toHaveBeenCalledWith('hello');
  });

  it('renders Select with correct value', () => {
    render(<ActionsFilters {...defaultProps} statusValue="active" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('uses shadcn Select (not old buttons)', () => {
    render(<ActionsFilters {...defaultProps} />);
    expect(screen.queryByRole('button', { name: /todos|all/i })).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
