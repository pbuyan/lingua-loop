import { z } from 'zod';

export const positionDtoSchema = z.object({
  positionId: z.string(),
  ticker: z.string(),
  quantity: z.number(),
  marketValue: z.number(),
  unrealizedPnl: z.number(),
  currency: z.string(),
  lastUpdated: z.string(),
});

export const positionsDtoSchema = z.array(positionDtoSchema);
