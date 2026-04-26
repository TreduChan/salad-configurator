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
	clearSlot: (slotId: string) => void;
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
			let targetSlot: string | null = null
			for (let i = 1; i <= slotCount; i++) {
				const key = `${i}`
				if (state.slots[key] == null) {
					targetSlot = key
					break
				}
			}

			if (targetSlot) {
				set({ slots: { ...state.slots, [targetSlot]: item } })
			}
		}
	},
	removeIngredient: (id) => {
		const state = get()
		const newSlots = { ...state.slots }
		const matchedKey = Object.keys(newSlots).find((key) => newSlots[key]?.id === id)

		if (matchedKey) {
			newSlots[matchedKey] = null
			set({ slots: newSlots })
		}
	},
	clearSlot: (slotId) => {
		const state = get()
		if (slotId in state.slots) {
			set({ slots: { ...state.slots, [slotId]: null } })
		}
	},
}));
