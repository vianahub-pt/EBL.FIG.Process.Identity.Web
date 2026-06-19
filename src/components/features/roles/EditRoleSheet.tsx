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
import { updateRoleSchema, UpdateRoleFormData } from '@/lib/schemas/role.schema';
import { useUpdateRole } from '@/hooks/use-roles';
import { Role } from '@/types/roles.types';

interface EditRoleSheetProps {
  role: Role;
  open: boolean;
  onClose: () => void;
}

export function EditRoleSheet({ role, open, onClose }: EditRoleSheetProps) {
  const t = useTranslations('roles');
  const { mutate: updateRole, isPending } = useUpdateRole();

  const form = useForm<UpdateRoleFormData>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: { name: role.name, description: '' },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: role.name, description: '' });
    }
  }, [open, role, form]);

  const onSubmit = (data: UpdateRoleFormData) => {
    updateRole({ id: role.id, data }, {
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
                        maxLength={100}
                        placeholder={t('form.namePlaceholder')}
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
                        maxLength={255}
                        placeholder={t('form.descriptionPlaceholder')}
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
