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
import { useGetAppById } from '@/hooks/use-apps';

interface AppDetailSheetProps {
  appId: number | null;
  open: boolean;
  onClose: () => void;
}

export function AppDetailSheet({ appId, open, onClose }: AppDetailSheetProps) {
  const t = useTranslations('apps');
  const { data: app, isLoading } = useGetAppById(appId ?? 0);

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
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
            </>
          ) : app ? (
            <>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {t('columns.tenant')}
                </p>
                <p className="text-sm font-medium">{app.tenant}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {t('columns.name')}
                </p>
                <p className="text-sm font-medium">{app.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {t('columns.isActive')}
                </p>
                <Badge variant={app.isActive ? 'default' : 'secondary'}>
                  {app.isActive ? t('active') : t('inactive')}
                </Badge>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">{t('notFound')}</p>
          )}
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
