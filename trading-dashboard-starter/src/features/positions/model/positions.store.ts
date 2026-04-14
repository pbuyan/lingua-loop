import { create } from 'zustand';

interface PositionsUiStore {
  symbolFilter: string;
  setSymbolFilter: (value: string) => void;
}

export const usePositionsUiStore = create<PositionsUiStore>((set) => ({
  symbolFilter: '',
  setSymbolFilter: (value) => set({ symbolFilter: value }),
}));
