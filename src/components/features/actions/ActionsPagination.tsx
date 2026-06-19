'use client';

import { useTranslations } from 'next-intl';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

interface ActionsPaginationProps {
  pageNumber: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (value: string) => void;
}

export function ActionsPagination({
  pageNumber,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  totalCount,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: ActionsPaginationProps) {
  const t = useTranslations('table');
  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount);
  const visiblePages = getVisiblePages(pageNumber, totalPages);
  const showPagination = totalCount > 0;

  return (
    <div className="flex flex-col gap-3 pt-2 lg:flex-row lg:items-center">
      <span className="text-sm text-muted-foreground">
        {totalCount > 0 ? `${start}–${end} / ${totalCount}` : '0'}
      </span>
      {showPagination && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:ml-auto">
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-label={t('paginating.previous')}
                  onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
                  disabled={!hasPreviousPage}
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
                      aria-label={`${t('paginating.page')} ${page}`}
                      isActive={pageNumber === page}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  aria-label={t('paginating.next')}
                  onClick={() => onPageChange(Math.min(totalPages, pageNumber + 1))}
                  disabled={!hasNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          {pageSizeOptions && onPageSizeChange && (
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
              <span>{t('paginating.pageSize')}</span>
              <Select value={String(pageSize)} onValueChange={onPageSizeChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((option) => (
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
  );
}
