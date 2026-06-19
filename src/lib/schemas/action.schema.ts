import { z } from 'zod';

export const createActionSchema = z.object({
  appId: z.coerce.number().int().positive(),
  name: z.string().min(1).max(50).trim(),
  description: z.string().min(1).max(255).trim(),
});

export const updateActionSchema = z.object({
  name: z.string().min(1).max(50).trim(),
  description: z.string().min(1).max(255).trim(),
});

export type CreateActionFormData = z.infer<typeof createActionSchema>;
export type UpdateActionFormData = z.infer<typeof updateActionSchema>;
