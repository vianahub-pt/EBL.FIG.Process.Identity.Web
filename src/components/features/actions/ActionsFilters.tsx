'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ActionsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
}

export function ActionsFilters({
  search,
  onSearchChange,
  statusValue,
  onStatusChange,
}: ActionsFiltersProps) {
  const t = useTranslations('actions');
  const tCommon = useTranslations('common');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <Select value={statusValue} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tCommon('filter.all')}</SelectItem>
          <SelectItem value="active">{tCommon('filter.active')}</SelectItem>
          <SelectItem value="inactive">{tCommon('filter.inactive')}</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder={t('search')}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
