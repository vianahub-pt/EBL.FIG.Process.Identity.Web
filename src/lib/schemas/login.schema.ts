import { z } from 'zod';

export const loginSchema = z.object({
  loginIdentifier: z.string().min(1, { message: 'Campo obrigatório' }).trim(),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
