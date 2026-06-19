import { z } from 'zod';

export const updateRoleSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  description: z.string().max(255).trim().optional(),
});

export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
