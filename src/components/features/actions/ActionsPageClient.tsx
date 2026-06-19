'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResourceGrid } from '@/components/ui/resource-grid';
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
import { Eye, MoreHorizontal, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Action } from '@/types/actions.types';
import { useGetActionsPaged, useActivateAction, useDeactivateAction, useDeleteAction } from '@/hooks/use-actions';
import { CreateActionSheet } from './CreateActionSheet';
import { EditActionSheet } from './EditActionSheet';
import { BulkUploadSheet } from './BulkUploadSheet';
import { ActionDetailSheet } from './ActionDetailSheet';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function getStatusFilterValue(value: boolean | undefined): 'all' | 'active' | 'inactive' {
  if (value === true) {
    return 'active';
  }

  if (value === false) {
    return 'inactive';
  }

  return 'all';
}

export function ActionsPageClient() {
  const t = useTranslations('actions');
  const tCommon = useTranslations('common');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [createOpen, setCreateOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [editingAction, setEditingAction] = useState<Action | null>(null);
  const [detailActionId, setDetailActionId] = useState<number | null>(null);
  const [deactivatingAction, setDeactivatingAction] = useState<Action | null>(null);
  const [deletingAction, setDeletingAction] = useState<Action | null>(null);

  const { data, isLoading, isError, refetch } = useGetActionsPaged({
    search: search || undefined,
    isActive,
    pageNumber,
    pageSize,
  });

  const { mutate: activate } = useActivateAction();
  const { mutate: deactivate } = useDeactivateAction();
  const { mutate: remove } = useDeleteAction();

  const items = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const hasNextPage = data?.hasNextPage ?? false;
  const hasPreviousPage = data?.hasPreviousPage ?? false;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPageNumber(1);
  };

  const handleIsActiveChange = (value: string) => {
    if (value === 'all') {
      setIsActive(undefined);
    } else if (value === 'active') {
      setIsActive(true);
    } else if (value === 'inactive') {
      setIsActive(false);
    } else {
      return;
    }

    setPageNumber(1);
  };

  const handlePageSizeChange = (value: string) => {
    const parsed = Number(value);

    if (!PAGE_SIZE_OPTIONS.includes(parsed)) {
      return;
    }

    setPageSize(parsed);
    setPageNumber(1);
  };

  const columns: ColumnDef<Action>[] = [
    {
      accessorKey: 'name',
      header: t('columns.name'),
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: 'isActive',
      header: t('columns.status'),
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
          {row.original.isActive ? t('status.active') : t('status.inactive')}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: t('columns.actions'),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t('columns.actions')}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDetailActionId(row.original.id)}>
              <Eye className="h-4 w-4 mr-2" />
              {t('detail.label')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingAction(row.original)}>
              <Pencil className="h-4 w-4 mr-2" />
              {t('edit.title')}
            </DropdownMenuItem>
            {row.original.isActive ? (
              <DropdownMenuItem onClick={() => setDeactivatingAction(row.original)}>
                <ToggleLeft className="h-4 w-4 mr-2" />
                {t('deactivate.label')}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => activate(row.original.id)}>
                <ToggleRight className="h-4 w-4 mr-2" />
                {t('activate.label')}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => setDeletingAction(row.original)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('delete.label')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ];

  return (
    <>
      <ResourceGrid
        columns={columns}
        data={items}
        isLoading={isLoading}
        emptyMessage={t('empty')}
        statusFilter={{
          value: getStatusFilterValue(isActive),
          onChange: handleIsActiveChange,
          options: [
            { value: 'all', label: t('filterAll') },
            { value: 'active', label: t('filterActive') },
            { value: 'inactive', label: t('filterInactive') },
          ],
        }}
        searchValue={search}
        searchPlaceholder={t('search')}
        onSearchChange={handleSearchChange}
        actionButtons={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBulkOpen(true)}
              className="rounded-r-none"
            >
              <Upload className="h-4 w-4 mr-2" />
              {t('importCsv')}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (!createOpen) setCreateOpen(true);
              }}
              className="rounded-l-none border border-l-0 border-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('newAction')}
            </Button>
          </>
        }
        isError={isError}
        errorMessage={tCommon('error')}
        retryLabel={tCommon('retry')}
        onRetry={refetch}
        pagination={{
          pageNumber,
          totalPages,
          totalCount,
          pageSize,
          hasNextPage,
          hasPreviousPage,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          onPageChange: setPageNumber,
          onPageSizeChange: handlePageSizeChange,
        }}
      />

      <CreateActionSheet open={createOpen} onClose={() => setCreateOpen(false)} />
      <BulkUploadSheet open={bulkOpen} onClose={() => setBulkOpen(false)} />

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
