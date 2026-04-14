import { create } from 'zustand';

interface UiStore {
  selectedPortfolioId: string | null;
  sideNavOpen: boolean;
  setSelectedPortfolioId: (portfolioId: string | null) => void;
  setSideNavOpen: (isOpen: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  selectedPortfolioId: 'GLOBAL-MASTER',
  sideNavOpen: true,
  setSelectedPortfolioId: (portfolioId) => set({ selectedPortfolioId: portfolioId }),
  setSideNavOpen: (isOpen) => set({ sideNavOpen: isOpen }),
}));
