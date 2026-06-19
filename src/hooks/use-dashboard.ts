'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export function useDashboard() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboard,
  });

  return {
    isLoading,
    isError,
    error,
    refetch,
    usersCount: data?.usersCount ?? 0,
    usersStatus: data?.usersStatus ?? [],
    rolesCount: data?.rolesCount ?? 0,
    actionsCount: data?.actionsCount ?? 0,
    resourcesCount: data?.resourcesCount ?? 0,
    appsCount: data?.appsCount ?? 0,
    appsStatus: data?.appsStatus ?? [],
    tenantsCount: data?.tenantsCount ?? 0,
    rolePermissionsCount: data?.rolePermissionsCount ?? 0,
    userRolesCount: data?.userRolesCount ?? 0,
  };
}
