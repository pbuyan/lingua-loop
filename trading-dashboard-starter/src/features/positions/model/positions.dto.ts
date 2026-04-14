export interface PositionDto {
  positionId: string;
  ticker: string;
  quantity: number;
  marketValue: number;
  unrealizedPnl: number;
  currency: string;
  lastUpdated: string;
}
