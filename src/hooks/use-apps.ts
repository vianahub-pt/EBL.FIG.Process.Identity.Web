'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { appsService } from '@/services/apps.service';
import { useNotification } from '@/hooks/use-notification';
import { GetAppsPagedParams, CreateAppRequest, UpdateAppRequest } from '@/types/apps.types';

export function useGetAppsPaged(params: GetAppsPagedParams) {
  return useQuery({
    queryKey: ['apps', params],
    queryFn: () => appsService.getAppsPaged(params),
  });
}

export function useGetAppById(id: number) {
  return useQuery({
    queryKey: ['apps', id],
    queryFn: () => appsService.getAppById(id),
    enabled: id > 0,
  });
}

export function useCreateApp() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('apps');

  return useMutation({
    mutationFn: (data: CreateAppRequest) => appsService.createApp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
      success(t('create.success'));
    },
    onError: (err: unknown) => {
      apiError(err, t('create.error'));
    },
  });
}

export function useUpdateApp() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('apps');

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAppRequest }) =>
      appsService.updateApp(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
      success(t('edit.success'));
    },
    onError: (err: unknown) => {
      apiError(err, t('edit.error'));
    },
  });
}

export function useDeleteApp() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('apps');

  return useMutation({
    mutationFn: (id: number) => appsService.deleteApp(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
      success(t('delete.success'));
    },
    onError: (err: unknown) => {
      apiError(err, t('delete.error'));
    },
  });
}

export function useBulkUploadApps() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('apps');

  return useMutation({
    mutationFn: (file: File) => appsService.bulkUploadApps(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
      success(t('bulkUpload.success'));
    },
    onError: (err: unknown) => {
      apiError(err, t('bulkUpload.error'));
    },
  });
}
