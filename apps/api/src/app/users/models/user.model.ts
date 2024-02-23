import { z } from 'zod';
import { User } from '../entities';

export type UserKey = keyof User;

export const ZodValidEmailSchema = z.string().email();
