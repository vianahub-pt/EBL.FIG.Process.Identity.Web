import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColumnDef } from '@tanstack/react-table';
import { ResourceGrid } from '../resource-grid';

jest.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

interface TestRow {
  id: number;
  name: string;
  active: boolean;
}

const columns: ColumnDef<TestRow, unknown>[] = [
  { accessorKey: 'name', header: 'Nome' },
  {
    accessorKey: 'active',
    header: 'Ativo',
    cell: ({ row }) => (row.original.active ? 'Sim' : 'Não'),
  },
];

const sampleData: TestRow[] = [
  { id: 1, name: 'Item A', active: true },
  { id: 2, name: 'Item B', active: false },
];

describe('ResourceGrid', () => {
  it('renders table rows with data', () => {
    render(
      <ResourceGrid columns={columns} data={sampleData} emptyMessage="Sem resultados" />
    );
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });

  it('shows emptyMessage when data is empty', () => {
    render(<ResourceGrid columns={columns} data={[]} emptyMessage="Sem resultados" />);
    expect(screen.getByText('Sem resultados')).toBeInTheDocument();
  });

  it('renders statusFilter Select with options', () => {
    render(
      <ResourceGrid
        columns={columns}
        data={sampleData}
        emptyMessage="Sem resultados"
        statusFilter={{
          value: 'all',
          onChange: jest.fn(),
          options: [
            { value: 'all', label: 'Todos' },
            { value: 'active', label: 'Ativo' },
            { value: 'inactive', label: 'Inativo' },
          ],
        }}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(
      <ResourceGrid
        columns={columns}
        data={sampleData}
        emptyMessage="Sem resultados"
        searchValue=""
        searchPlaceholder="Pesquisar..."
        onSearchChange={jest.fn()}
      />
    );
    expect(screen.getByPlaceholderText('Pesquisar...')).toBeInTheDocument();
  });

  it('calls onSearchChange when user types in search input', () => {
    const onSearchChange = jest.fn();
    render(
      <ResourceGrid
        columns={columns}
        data={sampleData}
        emptyMessage="Sem resultados"
        searchValue=""
        onSearchChange={onSearchChange}
      />
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onSearchChange).toHaveBeenCalledWith('test');
  });

  it('renders actionButtons slot', () => {
    render(
      <ResourceGrid
        columns={columns}
        data={sampleData}
        emptyMessage="Sem resultados"
        actionButtons={<button>Nova Ação</button>}
      />
    );
    expect(screen.getByText('Nova Ação')).toBeInTheDocument();
  });

  it('shows error banner when isError is true', () => {
    render(
      <ResourceGrid
        columns={columns}
        data={[]}
        emptyMessage="Sem resultados"
        isError
        errorMessage="Erro ao carregar"
        retryLabel="Tentar novamente"
        onRetry={jest.fn()}
      />
    );
    expect(screen.getByText('Erro ao carregar')).toBeInTheDocument();
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = jest.fn();
    render(
      <ResourceGrid
        columns={columns}
        data={[]}
        emptyMessage="Sem resultados"
        isError
        errorMessage="Erro"
        retryLabel="Retry"
        onRetry={onRetry}
      />
    );
    fireEvent.click(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders pagination count when pagination prop is provided with data', () => {
    render(
      <ResourceGrid
        columns={columns}
        data={sampleData}
        emptyMessage="Sem resultados"
        pagination={{
          pageNumber: 1,
          totalPages: 3,
          totalCount: 25,
          pageSize: 10,
          hasNextPage: true,
          hasPreviousPage: false,
          pageSizeOptions: [10, 20],
          onPageChange: jest.fn(),
          onPageSizeChange: jest.fn(),
        }}
      />
    );
    expect(screen.getByText('1–10 / 25')).toBeInTheDocument();
  });

  it('does not render pagination controls when totalCount is 0', () => {
    render(
      <ResourceGrid
        columns={columns}
        data={[]}
        emptyMessage="Sem resultados"
        pagination={{
          pageNumber: 1,
          totalPages: 1,
          totalCount: 0,
          pageSize: 10,
          hasNextPage: false,
          hasPreviousPage: false,
          onPageChange: jest.fn(),
        }}
      />
    );
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('calls onPageChange when pagination next is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <ResourceGrid
        columns={columns}
        data={sampleData}
        emptyMessage="Sem resultados"
        pagination={{
          pageNumber: 1,
          totalPages: 3,
          totalCount: 25,
          pageSize: 10,
          hasNextPage: true,
          hasPreviousPage: false,
          onPageChange,
        }}
      />
    );
    const nextBtn = screen.getByLabelText('table.paginating.next');
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('shows fallback "Todos" when statusFilter value is unrecognized', () => {
    render(
      <ResourceGrid
        columns={columns}
        data={sampleData}
        emptyMessage="Sem resultados"
        statusFilter={{
          value: 'all',
          onChange: jest.fn(),
          options: [
            { value: 'all', label: 'Todos' },
            { value: 'active', label: 'Ativo' },
          ],
        }}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
