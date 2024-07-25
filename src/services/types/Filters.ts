import { z } from 'zod';

export const FilterSchema = z.object({
  userId: z.string().optional().catch(undefined),
});

export type FilterType = z.infer<typeof FilterSchema>;
