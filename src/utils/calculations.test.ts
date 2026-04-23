import { describe, it, expect } from "vitest";
import { calculateTotalWeight } from "./calculations";
import type { Ingredient } from "../types";

describe("calculateTotalWeight", () => {
  it("returns the sum of ingredient weights", () => {
    const ingredients: Ingredient[] = [
      {
        id: 1,
        name: "Ingredient A",
        categoryId: 1,
        diets: [],
        weight_grams: 50,
      },
      {
        id: 2,
        name: "Ingredient B",
        categoryId: 2,
        diets: [],
        weight_grams: 100,
      },
    ];

    const result = calculateTotalWeight(ingredients);

    expect(result).toBe(150);
  });
});
