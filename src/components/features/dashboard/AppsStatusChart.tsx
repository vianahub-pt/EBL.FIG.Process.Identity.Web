'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AppsStatusChartProps {
  apps: { isActive: boolean }[];
  isLoading?: boolean;
}

export function AppsStatusChart({ apps, isLoading }: AppsStatusChartProps) {
  const t = useTranslations('dashboard.charts');

  const active = apps.filter((a) => a.isActive).length;
  const inactive = apps.filter((a) => !a.isActive).length;

  const activeLabel = t('active');
  const inactiveLabel = t('inactive');

  const data = [{ name: 'Apps', [activeLabel]: active, [inactiveLabel]: inactive }];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('appsByStatus')}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey={activeLabel} fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey={inactiveLabel} fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
