'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateAppSchema, UpdateAppFormData } from '@/lib/schemas/app.schema';
import { useUpdateApp } from '@/hooks/use-apps';
import { App } from '@/types/apps.types';

interface EditAppSheetProps {
  app: App;
  open: boolean;
  onClose: () => void;
}

export function EditAppSheet({ app, open, onClose }: EditAppSheetProps) {
  const t = useTranslations('apps');
  const { mutate: updateApp, isPending } = useUpdateApp();

  const form = useForm<UpdateAppFormData>({
    resolver: zodResolver(updateAppSchema),
    defaultValues: { name: app.name, description: '' },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: app.name, description: '' });
    }
  }, [open, app, form]);

  const onSubmit = (data: UpdateAppFormData) => {
    updateApp({ id: app.id, data }, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('edit.title')}</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.namePlaceholder')}
                        maxLength={200}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.description')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.descriptionPlaceholder')}
                        maxLength={500}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                  {t('cancel')}
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? t('saving') : t('edit.submit')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
