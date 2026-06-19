'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { actionsService } from '@/services/actions.service';
import { useNotification } from '@/hooks/use-notification';
import { GetActionsPagedParams, CreateActionRequest, UpdateActionRequest } from '@/types/actions.types';

export function useGetActionsPaged(params: GetActionsPagedParams) {
  return useQuery({
    queryKey: ['actions', params],
    queryFn: () => actionsService.getActionsPaged(params),
  });
}

export function useGetActionById(id: number) {
  return useQuery({
    queryKey: ['actions', id],
    queryFn: () => actionsService.getActionById(id),
    enabled: id > 0,
  });
}

export function useCreateAction() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('actions');

  return useMutation({
    mutationFn: (data: CreateActionRequest) => actionsService.createAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      success(t('create.success'));
    },
    onError: (err: unknown) => {
      apiError(err, t('create.error'));
    },
  });
}

export function useUpdateAction() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('actions');

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateActionRequest }) =>
      actionsService.updateAction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      success(t('edit.success'));
    },
    onError: (err: unknown) => {
      apiError(err, t('edit.error'));
    },
  });
}

export function useActivateAction() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('actions');

  return useMutation({
    mutationFn: (id: number) => actionsService.activateAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      success(t('activate.success'));
    },
    onError: (err: unknown) => {
      apiError(err);
    },
  });
}

export function useDeactivateAction() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('actions');

  return useMutation({
    mutationFn: (id: number) => actionsService.deactivateAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      success(t('deactivate.success'));
    },
    onError: (err: unknown) => {
      apiError(err);
    },
  });
}

export function useDeleteAction() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('actions');

  return useMutation({
    mutationFn: (id: number) => actionsService.deleteAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      success(t('delete.success'));
    },
    onError: (err: unknown) => {
      apiError(err);
    },
  });
}

export function useBulkUploadActions() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('actions');

  return useMutation({
    mutationFn: (file: File) => actionsService.bulkUploadActions(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      success(t('bulk.success'));
    },
    onError: (err: unknown) => {
      apiError(err);
    },
  });
}
