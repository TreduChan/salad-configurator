import { Link } from "react-router-dom";
import React from "react";
import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient } from "../types";
import { calculateTotalWeight } from "../utils/calculations";

const SummaryBar: React.FC = () => {
  const slots = useIngredientStore((state) => state.slots);
  const removeIngredient = useIngredientStore((state) => state.removeIngredient);

  const activeIngredients = Object.values(slots).filter(
    (i): i is Ingredient => i !== null
  );
  const totalWeightGrams = calculateTotalWeight(activeIngredients);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col sm:flex-row gap-8 shadow-xl">
      
      {/* Left: Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-2">Selected ingredients ({activeIngredients.length})</h3>
        {activeIngredients.length === 0 ? (
        <p className="text-sm text-gray-300">
          No ingredients selected
        </p>
        ) : (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeIngredients.map((ingredient, index) => (
              <div
                key={ingredient.id || index}
                className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-xs rounded-full"
              >
                {/* name */}
                <span>
                  {typeof ingredient === "string"
                    ? ingredient
                    : ingredient.name}
                </span>
                {/* remove button */} 
                <button
                  onClick={() => removeIngredient(ingredient.id)}
                  className="ml-1 text-white hover:text-red-200 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Print button In later sprints, we will replace this with a real window.print() */}
        <Link to="/print" className="mt-2">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full">
            Print
          </button>
        </Link>
      </div>

      {/* Right: Totals */}
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        
        {/* Arvioitu paino */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          {totalWeightGrams} g
        </div>

        {/* Price */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          9,95 €
        </div>

      </div>
    </div>
  );
};

export default SummaryBar;