'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useBulkUploadActions } from '@/hooks/use-actions';

interface BulkUploadSheetProps {
  open: boolean;
  onClose: () => void;
}

export function BulkUploadSheet({ open, onClose }: BulkUploadSheetProps) {
  const t = useTranslations('actions');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: bulkUpload, isPending } = useBulkUploadActions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    bulkUpload(selectedFile, {
      onSuccess: () => {
        setSelectedFile(null);
        if (inputRef.current) inputRef.current.value = '';
        onClose();
      },
    });
  };

  const handleClose = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && handleClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('bulk.title')}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="csv-upload">
              {t('bulk.selectFile')}
            </label>
            <input
              ref={inputRef}
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
              {t('cancel')}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedFile || isPending}
            >
              {isPending ? t('saving') : t('bulk.submit')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
