import type { Ingredient } from "../types";

export function calculateTotalWeight(ingredients: Ingredient[]): number {
  return ingredients.reduce(
    (sum, ingredient) => sum + (ingredient.weight_grams ?? 0),
    0
  );
}
