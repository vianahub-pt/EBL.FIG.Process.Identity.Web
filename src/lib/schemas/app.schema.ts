import { z } from 'zod';

export const createAppSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  description: z.string().min(1).max(500).trim(),
});

export const updateAppSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  description: z.string().min(1).max(500).trim(),
});

export type CreateAppFormData = z.infer<typeof createAppSchema>;
export type UpdateAppFormData = z.infer<typeof updateAppSchema>;
