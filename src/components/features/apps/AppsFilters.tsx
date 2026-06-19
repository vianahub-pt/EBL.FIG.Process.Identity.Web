'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AppsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  isActive: boolean | undefined;
  onIsActiveChange: (value: boolean | undefined) => void;
}

export function AppsFilters({
  search,
  onSearchChange,
  isActive,
  onIsActiveChange,
}: AppsFiltersProps) {
  const t = useTranslations('apps');

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Input
        placeholder={t('search')}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <div className="flex gap-2">
        <Button
          variant={isActive === undefined ? 'default' : 'outline'}
          size="sm"
          onClick={() => onIsActiveChange(undefined)}
        >
          {t('filter.all')}
        </Button>
        <Button
          variant={isActive === true ? 'default' : 'outline'}
          size="sm"
          onClick={() => onIsActiveChange(true)}
        >
          {t('filter.active')}
        </Button>
        <Button
          variant={isActive === false ? 'default' : 'outline'}
          size="sm"
          onClick={() => onIsActiveChange(false)}
        >
          {t('filter.inactive')}
        </Button>
      </div>
    </div>
  );
}
