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

interface ResourcesSummaryChartProps {
  rolesCount: number;
  actionsCount: number;
  resourcesCount: number;
  rolePermissionsCount: number;
  isLoading?: boolean;
}

export function ResourcesSummaryChart({
  rolesCount,
  actionsCount,
  resourcesCount,
  rolePermissionsCount,
  isLoading,
}: ResourcesSummaryChartProps) {
  const t = useTranslations('dashboard.charts');
  const nav = useTranslations('navigation');

  const data = [
    { name: nav('roles'), total: rolesCount },
    { name: nav('actions'), total: actionsCount },
    { name: nav('resources'), total: resourcesCount },
    { name: nav('rolePermissions'), total: rolePermissionsCount },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('rolesDistribution')}</CardTitle>
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
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
