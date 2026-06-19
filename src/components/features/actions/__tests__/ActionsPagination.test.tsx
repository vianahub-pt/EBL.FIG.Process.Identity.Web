import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionsPagination } from '../ActionsPagination';

jest.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

describe('ActionsPagination', () => {
  const defaultProps = {
    pageNumber: 1,
    totalPages: 3,
    hasNextPage: true,
    hasPreviousPage: false,
    totalCount: 25,
    pageSize: 10,
    onPageChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays count label correctly', () => {
    render(<ActionsPagination {...defaultProps} />);
    expect(screen.getByText('1–10 / 25')).toBeInTheDocument();
  });

  it('displays "0" when totalCount is 0', () => {
    render(
      <ActionsPagination
        {...defaultProps}
        totalCount={0}
        pageNumber={1}
        totalPages={1}
        hasNextPage={false}
        hasPreviousPage={false}
      />
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('does not render pagination nav when totalCount is 0', () => {
    render(
      <ActionsPagination
        {...defaultProps}
        totalCount={0}
        totalPages={1}
        hasNextPage={false}
        hasPreviousPage={false}
      />
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders shadcn Pagination navigation', () => {
    render(<ActionsPagination {...defaultProps} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('previous button is disabled when hasPreviousPage is false', () => {
    render(<ActionsPagination {...defaultProps} hasPreviousPage={false} />);
    const prevBtn = screen.getByLabelText('table.paginating.previous');
    expect(prevBtn).toBeDisabled();
  });

  it('calls onPageChange with incremented page when next is clicked', () => {
    const onPageChange = jest.fn();
    render(<ActionsPagination {...defaultProps} onPageChange={onPageChange} />);
    const nextBtn = screen.getByLabelText('table.paginating.next');
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('renders pageSizeOptions Select when provided', () => {
    const onPageSizeChange = jest.fn();
    render(
      <ActionsPagination
        {...defaultProps}
        pageSizeOptions={[10, 20, 50]}
        onPageSizeChange={onPageSizeChange}
      />
    );
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThanOrEqual(1);
  });

  it('renders correct page range for last page', () => {
    render(
      <ActionsPagination
        {...defaultProps}
        pageNumber={3}
        totalPages={3}
        hasNextPage={false}
        hasPreviousPage={true}
        totalCount={25}
        pageSize={10}
      />
    );
    expect(screen.getByText('21–25 / 25')).toBeInTheDocument();
  });
});
