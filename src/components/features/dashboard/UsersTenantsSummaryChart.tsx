'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface UsersTenantsSummaryChartProps {
  usersCount: number;
  tenantsCount: number;
  userRolesCount: number;
  appsCount: number;
  isLoading?: boolean;
}

export function UsersTenantsSummaryChart({
  usersCount,
  tenantsCount,
  userRolesCount,
  appsCount,
  isLoading,
}: UsersTenantsSummaryChartProps) {
  const t = useTranslations('dashboard.charts');
  const nav = useTranslations('navigation');

  const data = [
    { name: nav('users'), total: usersCount },
    { name: nav('tenants'), total: tenantsCount },
    { name: nav('userRoles'), total: userRolesCount },
    { name: nav('apps'), total: appsCount },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('rolesPermissions')}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="total" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
