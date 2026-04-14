import type { ColDef } from 'ag-grid-community';
import type { PositionRow } from '@/features/positions/model/positions.types';

export const positionsDefaultColDef: ColDef<PositionRow> = {
  sortable: true,
  filter: true,
  resizable: true,
  flex: 1,
  minWidth: 120,
};
