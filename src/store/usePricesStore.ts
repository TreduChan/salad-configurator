import { create } from "zustand";
import type { PriceListItem } from "../types";
import { getPricesWithToken } from "../services/api";

interface PriceStore {
  prices: PriceListItem[];
  fetchPrices: (token: string) => Promise<void>;
}

export const usePriceStore = create<PriceStore>((set) => ({
  prices: [],

  fetchPrices: async (token: string) => {
    try {
      const data = await getPricesWithToken(token);
      set({ prices: data });
    } catch (error) {
      console.error("Failed to fetch prices:", error);
      set({ prices: [] });
    }
  },
}));