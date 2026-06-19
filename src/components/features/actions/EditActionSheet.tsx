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
import { updateActionSchema, UpdateActionFormData } from '@/lib/schemas/action.schema';
import { useUpdateAction } from '@/hooks/use-actions';
import { Action } from '@/types/actions.types';

interface EditActionSheetProps {
  action: Action;
  open: boolean;
  onClose: () => void;
}

export function EditActionSheet({ action, open, onClose }: EditActionSheetProps) {
  const t = useTranslations('actions');
  const { mutate: updateAction, isPending } = useUpdateAction();

  const form = useForm<UpdateActionFormData>({
    resolver: zodResolver(updateActionSchema),
    defaultValues: { name: action.name, description: '' },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: action.name, description: '' });
    }
  }, [open, action, form]);

  const onSubmit = (data: UpdateActionFormData) => {
    updateAction({ id: action.id, data }, {
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
                    <FormLabel>{t('edit.name')}</FormLabel>
                    <FormControl>
                      <Input maxLength={50} {...field} />
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
                    <FormLabel>{t('edit.description')}</FormLabel>
                    <FormControl>
                      <Input maxLength={255} {...field} />
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
