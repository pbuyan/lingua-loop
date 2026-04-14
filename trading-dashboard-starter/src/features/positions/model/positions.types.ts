export interface Position {
  id: string;
  symbol: string;
  quantity: number;
  marketValue: number;
  pnl: number;
  currency: string;
  lastUpdated: Date;
}

export interface PositionRow {
  id: string;
  symbol: string;
  quantity: number;
  marketValueDisplay: string;
  pnlDisplay: string;
  pnlDirection: 'up' | 'down' | 'flat';
  lastUpdatedDisplay: string;
}
