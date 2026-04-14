import { formatCurrency } from '@/shared/lib/format/currency';
import { formatDateTime } from '@/shared/lib/format/dateTime';
import { PositionDto } from '@/features/positions/model/positions.dto';
import { Position, PositionRow } from '@/features/positions/model/positions.types';

export function mapPositionDtoToDomain(dto: PositionDto): Position {
  return {
    id: dto.positionId,
    symbol: dto.ticker,
    quantity: dto.quantity,
    marketValue: dto.marketValue,
    pnl: dto.unrealizedPnl,
    currency: dto.currency,
    lastUpdated: new Date(dto.lastUpdated),
  };
}

export function mapPositionToRow(position: Position): PositionRow {
  return {
    id: position.id,
    symbol: position.symbol,
    quantity: position.quantity,
    marketValueDisplay: formatCurrency(position.marketValue, position.currency),
    pnlDisplay: formatCurrency(position.pnl, position.currency),
    pnlDirection: position.pnl > 0 ? 'up' : position.pnl < 0 ? 'down' : 'flat',
    lastUpdatedDisplay: formatDateTime(position.lastUpdated),
  };
}
