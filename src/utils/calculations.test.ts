import { describe, it, expect } from 'vitest';
import { calculateTotalWeight } from './calculations';
import type { Ingredient } from '../types';

const makeIngredient = (id: number, weight: number): Ingredient => ({
  id,
  name: `Ingredient ${id}`,
  categoryId: 1,
  diets: [],
  wedge_image_url: '',
  weight_grams: weight,
});

describe('calculateTotalWeight', () => {
  it('returns the sum of weight_grams for all ingredients', () => {
    const ingredients = [makeIngredient(1, 50), makeIngredient(2, 100)];
    expect(calculateTotalWeight(ingredients)).toBe(150);
  });

  it('returns 0 for an empty array', () => {
    expect(calculateTotalWeight([])).toBe(0);
  });

  it('treats missing weight_grams as 0', () => {
    const ingredient = { ...makeIngredient(1, 0), weight_grams: undefined } as unknown as Ingredient;
    expect(calculateTotalWeight([ingredient])).toBe(0);
  });
});
