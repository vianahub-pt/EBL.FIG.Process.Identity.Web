'use client';

import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetActionById } from '@/hooks/use-actions';

interface ActionDetailSheetProps {
  actionId: number | null;
  open: boolean;
  onClose: () => void;
}

export function ActionDetailSheet({ actionId, open, onClose }: ActionDetailSheetProps) {
  const t = useTranslations('actions');
  const { data: action, isLoading } = useGetActionById(actionId ?? 0);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('detail.title')}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/4" />
            </>
          ) : action ? (
            <>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {t('detail.id')}
                </p>
                <p className="text-sm font-medium">{action.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {t('columns.name')}
                </p>
                <p className="text-sm font-medium">{action.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {t('columns.status')}
                </p>
                <Badge variant={action.isActive ? 'default' : 'secondary'}>
                  {action.isActive ? t('status.active') : t('status.inactive')}
                </Badge>
              </div>
            </>
          ) : null}
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            {t('detail.close')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
