'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResourceGrid } from '@/components/ui/resource-grid';
import { Badge } from '@/components/ui/badge';
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
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { App } from '@/types/apps.types';
import { useGetAppsPaged, useDeleteApp } from '@/hooks/use-apps';
import { CreateAppSheet } from './CreateAppSheet';
import { EditAppSheet } from './EditAppSheet';
import { BulkUploadSheet } from './BulkUploadSheet';
import { AppDetailSheet } from './AppDetailSheet';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function getStatusFilterValue(value: boolean | undefined): 'all' | 'active' | 'inactive' {
  if (value === true) return 'active';
  if (value === false) return 'inactive';
  return 'all';
}

export function AppsPageClient() {
  const t = useTranslations('apps');
  const tCommon = useTranslations('common');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [createOpen, setCreateOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [detailAppId, setDetailAppId] = useState<number | null>(null);
  const [deletingApp, setDeletingApp] = useState<App | null>(null);

  const { data, isLoading, isError, refetch } = useGetAppsPaged({
    search: search || undefined,
    isActive,
    pageNumber,
    pageSize,
  });

  const { mutate: remove } = useDeleteApp();

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
    if (value === 'active') {
      setIsActive(true);
    } else if (value === 'inactive') {
      setIsActive(false);
    } else {
      setIsActive(undefined);
    }
    setPageNumber(1);
  };

  const handlePageSizeChange = (value: string) => {
    const parsed = Number(value);
    if (!PAGE_SIZE_OPTIONS.includes(parsed)) return;
    setPageSize(parsed);
    setPageNumber(1);
  };

  const columns: ColumnDef<App>[] = [
    {
      accessorKey: 'name',
      header: t('columns.name'),
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: 'tenant',
      header: t('columns.tenantId'),
      cell: ({ row }) => (
        <span className="text-muted-foreground hidden lg:table-cell">
          {row.original.tenant}
        </span>
      ),
    },
    {
      accessorKey: 'isActive',
      header: t('columns.isActive'),
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
          {row.original.isActive ? t('active') : t('inactive')}
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
            <DropdownMenuItem onClick={() => setDetailAppId(row.original.id)}>
              <Eye className="h-4 w-4 mr-2" />
              {t('detail.label')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingApp(row.original)}>
              <Pencil className="h-4 w-4 mr-2" />
              {t('edit.title')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeletingApp(row.original)}
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
            { value: 'all', label: tCommon('filter.all') },
            { value: 'active', label: tCommon('filter.active') },
            { value: 'inactive', label: tCommon('filter.inactive') },
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
              {t('bulkUpload.button')}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (!createOpen) setCreateOpen(true);
              }}
              className="rounded-l-none border border-l-0 border-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('create.button')}
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

      <CreateAppSheet open={createOpen} onClose={() => setCreateOpen(false)} />
      <BulkUploadSheet open={bulkOpen} onClose={() => setBulkOpen(false)} />

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
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
