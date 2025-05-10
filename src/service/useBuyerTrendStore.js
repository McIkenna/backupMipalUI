import { create } from 'zustand';
import { buyerTendApi } from './salesRecordApi';

export const useBuyerTrendStore = create((set) => ({
  buyerTrend: [],
  loading: false,
  error: null,
  fetchBuyerTrend: async () => {
    set({ loading: true, error: null });
    try {
      const data = await buyerTendApi();
      set({ buyerTrend: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));