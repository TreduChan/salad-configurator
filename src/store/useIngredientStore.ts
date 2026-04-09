import { create } from 'zustand';

import type { Bowl, Ingredient } from '../types';

export interface IngredientStore {
	slots: Record<string, Ingredient | null>;
	baseType: number;
	selectedBowl: Bowl | null;
	setBaseType: (id: number) => void;
	setBowl: (bowl: Bowl | null) => void;
	clearSelection: () => void;
	addIngredient: (item: Ingredient) => void;
	removeIngredient: (id: number) => void;
}

export const useIngredientStore = create<IngredientStore>((set, get) => ({
	slots: {},
	baseType: 1,
	selectedBowl: null,
	setBaseType: (id) => set({ baseType: id }),
	setBowl: (bowl) => set({ selectedBowl: bowl }),
	clearSelection: () => set({ slots: {}, baseType: 1, selectedBowl: null }),
	addIngredient: (item) => {
		const state = get()
		if (item.categoryId === 6) {
			set({ slots: { ...state.slots, base: item } })
		} else {
			const slotCount = state.selectedBowl?.slot_count ?? 0
			for (let i = 1; i <= slotCount; i++) {
				const key = `slot-${i}`
				if (!state.slots[key]) {
					set({ slots: { ...state.slots, [key]: item } })
					break
				}
			}
		}
	},
	removeIngredient: (_id) => {
		// Placeholder for ingredient removal logic.
	},
}));
