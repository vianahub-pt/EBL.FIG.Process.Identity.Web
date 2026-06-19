'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Eye, MoreHorizontal, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
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
import { Action } from '@/types/actions.types';
import { useActivateAction, useDeactivateAction, useDeleteAction } from '@/hooks/use-actions';
import { EditActionSheet } from './EditActionSheet';
import { ActionDetailSheet } from './ActionDetailSheet';

interface ActionsListProps {
  items: Action[];
  isLoading: boolean;
}

export function ActionsList({ items, isLoading }: ActionsListProps) {
  const t = useTranslations('actions');
  const [editingAction, setEditingAction] = useState<Action | null>(null);
  const [detailActionId, setDetailActionId] = useState<number | null>(null);
  const [deactivatingAction, setDeactivatingAction] = useState<Action | null>(null);
  const [deletingAction, setDeletingAction] = useState<Action | null>(null);

  const { mutate: activate } = useActivateAction();
  const { mutate: deactivate } = useDeactivateAction();
  const { mutate: remove } = useDeleteAction();

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
              <th className="px-4 py-3 text-left font-medium">{t('columns.status')}</th>
              <th className="px-4 py-3 text-right font-medium">{t('columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((action) => (
              <tr key={action.id} className="border-t hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{action.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={action.isActive ? 'default' : 'secondary'}>
                    {action.isActive ? t('status.active') : t('status.inactive')}
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
                      <DropdownMenuItem onClick={() => setDetailActionId(action.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {t('detail.label')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingAction(action)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        {t('edit.title')}
                      </DropdownMenuItem>
                      {action.isActive ? (
                        <DropdownMenuItem onClick={() => setDeactivatingAction(action)}>
                          <ToggleLeft className="h-4 w-4 mr-2" />
                          {t('deactivate.label')}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => activate(action.id)}>
                          <ToggleRight className="h-4 w-4 mr-2" />
                          {t('activate.label')}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => setDeletingAction(action)}
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

      {editingAction && (
        <EditActionSheet
          action={editingAction}
          open={!!editingAction}
          onClose={() => setEditingAction(null)}
        />
      )}

      <ActionDetailSheet
        actionId={detailActionId}
        open={detailActionId !== null}
        onClose={() => setDetailActionId(null)}
      />

      <AlertDialog
        open={!!deactivatingAction}
        onOpenChange={(v) => !v && setDeactivatingAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deactivate.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('deactivate.confirm')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deactivatingAction) {
                  deactivate(deactivatingAction.id);
                  setDeactivatingAction(null);
                }
              }}
            >
              {t('deactivate.label')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!deletingAction}
        onOpenChange={(v) => !v && setDeletingAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('delete.confirm')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deletingAction) {
                  remove(deletingAction.id);
                  setDeletingAction(null);
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
