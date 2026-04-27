import { Link } from "react-router-dom";
import React from "react";
import { useIngredientStore } from "../store/useIngredientStore";
import type { Ingredient, PriceListItem } from "../types";
import { calculateTotalWeight } from "../utils/calculations";

interface SummaryBarProps {
  prices: PriceListItem[];
}

const SummaryBar: React.FC<SummaryBarProps> = ({ prices }) => {
  const slots = useIngredientStore((state) => state.slots);
  const clearSlot = useIngredientStore((state) => state.clearSlot);

  const activeSlotItems = Object.entries(slots).filter(
    (entry): entry is [string, Ingredient] => entry[1] !== null
  );
  const activeIngredients = activeSlotItems.map(([, ingredient]) => ingredient);
  const totalWeightGrams = calculateTotalWeight(activeIngredients);
  const totalPrice = activeIngredients.reduce((sum, ingredient) => {
    const matchedPrice = prices.find((priceItem) => priceItem.item_id === ingredient.id);
    return sum + (matchedPrice?.price ?? 0);
  }, 0);
  const formattedPrice = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrice);

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
            {activeSlotItems.map(([slotKey, ingredient]) => (
              <div
                key={slotKey}
                className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-xs rounded-full"
              >
                {/* name */}
                <span>
                  {ingredient.name}
                </span>
                {/* remove button */} 
                <button
                  onClick={() => clearSlot(slotKey)}
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
          {formattedPrice}
        </div>

      </div>
    </div>
  );
};

export default SummaryBar;