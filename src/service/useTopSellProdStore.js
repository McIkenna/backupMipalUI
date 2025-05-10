import { create } from 'zustand';
import { topSellingProdApi } from './salesRecordApi';

export const useTopSellProdStore = create((set) => ({
  topSellProd: [],
  loading: false,
  error: null,
  fetchTopSellProd: async () => {
    set({ loading: true, error: null });
    try {
      const data = await topSellingProdApi();
      set({ topSellProd: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));