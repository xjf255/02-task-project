import { create } from "zustand";
import { StorePage } from "../types";

export const usePageStore = create<StorePage>()((set) => ({
  page: 0,
  changeNextPage: () => set((state) => ({ page: state.page + 1 })),
  changeLastPage: () => set((state) => ({ page: Math.max(state.page - 1, 0) }))
}))