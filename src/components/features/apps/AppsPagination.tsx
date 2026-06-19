'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface AppsPaginationProps {
  pageNumber: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalCount: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function AppsPagination({
  pageNumber,
  hasPreviousPage,
  hasNextPage,
  totalCount,
  pageSize,
  onPrevious,
  onNext,
}: AppsPaginationProps) {
  const t = useTranslations('common');
  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between pt-2">
      <span className="text-sm text-muted-foreground">
        {totalCount > 0 ? `${start}–${end} / ${totalCount}` : '0'}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!hasPreviousPage}
        >
          {t('previous')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNextPage}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  );
}
