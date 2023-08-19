import { z } from 'zod';
import { _user } from './user.types';

export const createUserDto = z.object({
  ..._user,
}).strict();

export type createUserInput = z.infer<typeof createUserDto>;

export const findUserDto = z.object({
  id: z.string()
}).strict();

export const callbackDto = z.object({
  token: z.string()
}).strict();
