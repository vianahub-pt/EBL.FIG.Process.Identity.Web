'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { rolesService } from '@/services/roles.service';
import { useNotification } from '@/hooks/use-notification';
import { GetRolesPagedParams, UpdateRoleRequest } from '@/types/roles.types';

export function useGetRolesPaged(params: GetRolesPagedParams) {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => rolesService.getRolesPaged(params),
  });
}

export function useGetRoleById(id: number) {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: () => rolesService.getRoleById(id),
    enabled: id > 0,
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const { success, apiError } = useNotification();
  const t = useTranslations('roles');

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleRequest }) =>
      rolesService.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      success(t('edit.success'));
    },
    onError: (err: unknown) => {
      apiError(err, t('edit.error'));
    },
  });
}
