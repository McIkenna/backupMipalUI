import { create } from 'zustand';
import { salePredictApi } from './salesRecordApi';

export const usePredictSaleStore = create((set) => ({
  predictSale: [],
  loading: false,
  error: null,
  fetchPredictSale: async () => {
    set({ loading: true, error: null });
    try {
      const data = await salePredictApi();
      set({ predictSale: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));