import type { ColDef } from 'ag-grid-community';
import type { PositionRow } from '@/features/positions/model/positions.types';

export const positionsColumnDefs: ColDef<PositionRow>[] = [
  { field: 'symbol', headerName: 'Symbol', minWidth: 130 },
  { field: 'quantity', headerName: 'Qty', filter: 'agNumberColumnFilter' },
  { field: 'marketValueDisplay', headerName: 'Market Value' },
  {
    field: 'pnlDisplay',
    headerName: 'PnL',
    cellClass: (params) => {
      if (params.data?.pnlDirection === 'up') return 'cell-positive';
      if (params.data?.pnlDirection === 'down') return 'cell-negative';
      return undefined;
    },
  },
  { field: 'lastUpdatedDisplay', headerName: 'Last Updated', minWidth: 180 },
];
