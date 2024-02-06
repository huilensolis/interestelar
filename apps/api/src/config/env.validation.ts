import { z } from 'zod';

export const CEnvSchema = z.object({
  DB_NAME: z.coerce.string().min(1),
  DB_PASSWORD: z.coerce.string().min(1),
  DB_HOST: z.coerce.string().min(1),
  DB_PORT: z.coerce.number().min(1).default(5432),
  DB_USERNAME: z.coerce.string().min(1),
  AUTH_SECRET: z.coerce.string().min(4),
  AUTH_EXPIRES: z.coerce.string().min(2),
});

export type TEnvSchema = z.infer<typeof CEnvSchema>;
