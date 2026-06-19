import { getTranslations } from 'next-intl/server';
import { AppsPageClient } from '@/components/features/apps/AppsPageClient';

export default async function AppsPage() {
  const t = await getTranslations('apps');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
      </div>
      <AppsPageClient />
    </div>
  );
}
