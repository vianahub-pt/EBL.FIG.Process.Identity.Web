'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface UsersStatusChartProps {
  users: { isActive: boolean }[];
  isLoading?: boolean;
}

export function UsersStatusChart({ users, isLoading }: UsersStatusChartProps) {
  const t = useTranslations('dashboard.charts');

  const active = users.filter((u) => u.isActive).length;
  const inactive = users.filter((u) => !u.isActive).length;

  const data = [
    { name: t('active'), value: active },
    { name: t('inactive'), value: inactive },
  ];

  const COLORS = ['#22c55e', '#ef4444'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('usersByStatus')}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
