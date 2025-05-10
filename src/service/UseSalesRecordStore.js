import { create } from 'zustand';
import { salesRecordApi } from './salesRecordApi';

export const UseSalesRecordStore = create((set) => ({
  salesRecord: [],
  loading: false,
  error: null,
  fetchSalesRecord: async () => {
    set({ loading: true, error: null });
    try {
      const data = await salesRecordApi();
      set({ salesRecord: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));