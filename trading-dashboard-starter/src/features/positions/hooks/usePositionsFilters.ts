import { ChangeEvent } from 'react';
import { usePositionsUiStore } from '@/features/positions/model/positions.store';

export function usePositionsFilters() {
  const symbolFilter = usePositionsUiStore((state) => state.symbolFilter);
  const setSymbolFilter = usePositionsUiStore((state) => state.setSymbolFilter);

  const onSymbolFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSymbolFilter(event.target.value);
  };

  return {
    symbolFilter,
    onSymbolFilterChange,
  };
}
