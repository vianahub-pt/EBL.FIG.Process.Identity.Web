import { getTranslations } from 'next-intl/server';
import { ActionsPageClient } from '@/components/features/actions/ActionsPageClient';

export default async function ActionsPage() {
  const t = await getTranslations('actions');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
      </div>
      <ActionsPageClient />
    </div>
  );
}
