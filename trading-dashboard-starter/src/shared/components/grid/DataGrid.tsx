import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridOptions } from 'ag-grid-community';

interface DataGridProps<TRow> {
  rowData: TRow[];
  columnDefs: ColDef<TRow>[];
  defaultColDef?: ColDef<TRow>;
  gridOptions?: GridOptions<TRow>;
  height?: number;
}

export function DataGrid<TRow>({
  rowData,
  columnDefs,
  defaultColDef,
  gridOptions,
  height = 600,
}: DataGridProps<TRow>) {
  return (
    <div className="ag-theme-quartz panel" style={{ height }}>
      <AgGridReact<TRow>
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        animateRows
      />
    </div>
  );
}
