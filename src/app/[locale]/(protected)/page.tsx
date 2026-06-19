'use client';

import { useTranslations } from 'next-intl';
import {
  Users,
  Shield,
  Zap,
  Database,
  AppWindow,
  Building2,
  Lock,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/features/dashboard/MetricCard';
import { UsersStatusChart } from '@/components/features/dashboard/UsersStatusChart';
import { AppsStatusChart } from '@/components/features/dashboard/AppsStatusChart';
import { ResourcesSummaryChart } from '@/components/features/dashboard/ResourcesSummaryChart';
import { UsersTenantsSummaryChart } from '@/components/features/dashboard/UsersTenantsSummaryChart';
import { useDashboard } from '@/hooks/use-dashboard';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const {
    isLoading,
    isError,
    refetch,
    usersCount,
    usersStatus,
    rolesCount,
    actionsCount,
    resourcesCount,
    appsCount,
    appsStatus,
    tenantsCount,
    rolePermissionsCount,
    userRolesCount,
  } = useDashboard();

  const metrics = [
    { key: 'users', icon: Users, value: usersCount, label: t('metrics.users') },
    { key: 'roles', icon: Shield, value: rolesCount, label: t('metrics.roles') },
    { key: 'actions', icon: Zap, value: actionsCount, label: t('metrics.actions') },
    { key: 'resources', icon: Database, value: resourcesCount, label: t('metrics.resources') },
    { key: 'apps', icon: AppWindow, value: appsCount, label: t('metrics.apps') },
    { key: 'tenants', icon: Building2, value: tenantsCount, label: t('metrics.tenants') },
    { key: 'permissions', icon: Lock, value: rolePermissionsCount, label: t('metrics.permissions') },
    { key: 'userRoles', icon: UserCheck, value: userRolesCount, label: t('metrics.userRoles') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
      </div>

      {isError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 flex items-center justify-between gap-3">
          <span className="text-sm text-destructive">{tCommon('error')}</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            {tCommon('retry')}
          </Button>
        </div>
      )}

      {/* KPI Cards — Mobile: 1 col, sm: 2 cols, lg: 4 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.key}
            title={metric.label}
            value={metric.value}
            icon={metric.icon}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Charts — Mobile: 1 col, md: 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsersStatusChart users={usersStatus} isLoading={isLoading} />
        <AppsStatusChart apps={appsStatus} isLoading={isLoading} />
        <ResourcesSummaryChart
          rolesCount={rolesCount}
          actionsCount={actionsCount}
          resourcesCount={resourcesCount}
          rolePermissionsCount={rolePermissionsCount}
          isLoading={isLoading}
        />
        <UsersTenantsSummaryChart
          usersCount={usersCount}
          tenantsCount={tenantsCount}
          userRolesCount={userRolesCount}
          appsCount={appsCount}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
