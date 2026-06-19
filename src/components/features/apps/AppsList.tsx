'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { App } from '@/types/apps.types';
import { useDeleteApp } from '@/hooks/use-apps';
import { EditAppSheet } from './EditAppSheet';
import { AppDetailSheet } from './AppDetailSheet';

interface AppsListProps {
  items: App[];
  isLoading: boolean;
}

export function AppsList({ items, isLoading }: AppsListProps) {
  const t = useTranslations('apps');
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [detailAppId, setDetailAppId] = useState<number | null>(null);
  const [deletingApp, setDeletingApp] = useState<App | null>(null);

  const { mutate: remove } = useDeleteApp();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
        {t('empty')}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">{t('columns.name')}</th>
              <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">
                {t('columns.tenant')}
              </th>
              <th className="px-4 py-3 text-left font-medium">{t('columns.isActive')}</th>
              <th className="px-4 py-3 text-right font-medium">{t('columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((app) => (
              <tr key={app.id} className="border-t hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{app.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {app.tenant}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={app.isActive ? 'default' : 'secondary'}>
                    {app.isActive ? t('active') : t('inactive')}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={t('columns.actions')}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setDetailAppId(app.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {t('detail.label')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingApp(app)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        {t('edit.title')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingApp(app)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('delete.label')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingApp && (
        <EditAppSheet
          app={editingApp}
          open={!!editingApp}
          onClose={() => setEditingApp(null)}
        />
      )}

      <AppDetailSheet
        appId={detailAppId}
        open={detailAppId !== null}
        onClose={() => setDetailAppId(null)}
      />

      <AlertDialog
        open={!!deletingApp}
        onOpenChange={(v) => !v && setDeletingApp(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('delete.confirm')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingApp) {
                  remove(deletingApp.id);
                  setDeletingApp(null);
                }
              }}
            >
              {t('delete.label')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
