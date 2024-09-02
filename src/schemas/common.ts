import { z } from 'zod'

export const QueryFilterSchema = z.object({
  limit: z.number().optional(),
  order: z.string().optional(),
  search: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})
