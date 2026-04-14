import { http } from '@/shared/api/http';
import { PositionDto } from '@/features/positions/model/positions.dto';
import { positionsDtoSchema } from '@/features/positions/model/positions.schemas';

export interface GetPositionsParams {
  portfolioId?: string;
  symbol?: string;
}

const fallbackData: PositionDto[] = [
  {
    positionId: 'POS-001',
    ticker: 'AAPL',
    quantity: 1250,
    marketValue: 267500,
    unrealizedPnl: 18250,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  },
  {
    positionId: 'POS-002',
    ticker: 'MSFT',
    quantity: 900,
    marketValue: 378000,
    unrealizedPnl: -4200,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  },
  {
    positionId: 'POS-003',
    ticker: 'NVDA',
    quantity: 640,
    marketValue: 544000,
    unrealizedPnl: 31400,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  },
];

export async function getPositions(params: GetPositionsParams): Promise<PositionDto[]> {
  try {
    const response = await http.get<PositionDto[]>('/positions', { params });
    return positionsDtoSchema.parse(response.data);
  } catch {
    const filtered = params.symbol
      ? fallbackData.filter((item) => item.ticker.toLowerCase().includes(params.symbol!.toLowerCase()))
      : fallbackData;

    return positionsDtoSchema.parse(filtered);
  }
}
