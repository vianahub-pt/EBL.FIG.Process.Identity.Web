'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export interface StatusFilterOption {
  value: string;
  label: string;
}

export interface ResourceGridPaginationConfig {
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (value: string) => void;
}

interface ResourceGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage: string;
  statusFilter?: {
    value: string;
    onChange: (value: string) => void;
    options: StatusFilterOption[];
  };
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  actionButtons?: React.ReactNode;
  isError?: boolean;
  errorMessage?: string;
  retryLabel?: string;
  onRetry?: () => void;
  pagination?: ResourceGridPaginationConfig;
}

function getVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  const pages: Array<number | 'ellipsis'> = [1];
  if (start > 2) pages.push('ellipsis');
  for (let page = start; page <= end; page++) pages.push(page);
  if (end < totalPages - 1) pages.push('ellipsis');
  pages.push(totalPages);
  return pages;
}

export function ResourceGrid<TData, TValue>({
  columns,
  data,
  isLoading = false,
  emptyMessage,
  statusFilter,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  actionButtons,
  isError,
  errorMessage,
  retryLabel,
  onRetry,
  pagination,
}: ResourceGridProps<TData, TValue>) {
  const tTable = useTranslations('table');
  const tCommon = useTranslations('common');
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  const hasToolbar =
    statusFilter !== undefined || onSearchChange !== undefined || actionButtons !== undefined;
  const visiblePages = pagination
    ? getVisiblePages(pagination.pageNumber, pagination.totalPages)
    : [];
  const showPagination = pagination !== undefined && pagination.totalCount > 0;

  return (
    <div className="space-y-4">
      {hasToolbar && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {statusFilter && (
              <Select value={statusFilter.value} onValueChange={statusFilter.onChange}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusFilter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {onSearchChange && (
              <Input
                value={searchValue ?? ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="max-w-sm"
              />
            )}
          </div>
          {actionButtons && <div className="inline-flex shrink-0">{actionButtons}</div>}
        </div>
      )}

      {isError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 flex items-center justify-between gap-3">
          <span className="text-sm text-destructive">{errorMessage ?? tCommon('error')}</span>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              {retryLabel ?? tCommon('retry')}
            </Button>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer flex items-center gap-2'
                            : 'flex items-center gap-2'
                        }
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <span className="text-xs">
                            {header.column.getIsSorted() === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex flex-col gap-3 pt-2 lg:flex-row lg:items-center">
          <span className="text-sm text-muted-foreground">
            {pagination.totalCount > 0
              ? `${(pagination.pageNumber - 1) * pagination.pageSize + 1}–${Math.min(
                  pagination.pageNumber * pagination.pageSize,
                  pagination.totalCount
                )} / ${pagination.totalCount}`
              : '0'}
          </span>
          {showPagination && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:ml-auto">
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      aria-label={tTable('paginating.previous')}
                      onClick={() =>
                        pagination.onPageChange(Math.max(1, pagination.pageNumber - 1))
                      }
                      disabled={!pagination.hasPreviousPage}
                    />
                  </PaginationItem>
                  {visiblePages.map((page, index) =>
                    page === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          aria-label={`${tTable('paginating.page')} ${page}`}
                          isActive={pagination.pageNumber === page}
                          onClick={() => pagination.onPageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      aria-label={tTable('paginating.next')}
                      onClick={() =>
                        pagination.onPageChange(
                          Math.min(pagination.totalPages, pagination.pageNumber + 1)
                        )
                      }
                      disabled={!pagination.hasNextPage}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              {pagination.pageSizeOptions && pagination.onPageSizeChange && (
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  <span>{tTable('paginating.pageSize')}</span>
                  <Select
                    value={String(pagination.pageSize)}
                    onValueChange={pagination.onPageSizeChange}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pagination.pageSizeOptions.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
