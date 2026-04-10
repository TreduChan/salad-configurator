import { Link } from "react-router-dom";
import React from "react";
import { useIngredientStore } from "../store/useIngredientStore";

const SummaryBar: React.FC = () => {
  const slots = useIngredientStore((state) => state.slots);
  const removeIngredient = useIngredientStore((state) => state.removeIngredient);
  const activeIngredients = Object.values(slots).filter((i): i is NonNullable<typeof i> => i !== null);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      
      {/* Left: Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-2">
          Selected ingredients ({activeIngredients.length})
        </h3>
        {activeIngredients.length === 0 ? (
          <p className="text-sm text-gray-300">No ingredients selected</p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeIngredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className="flex items-center gap-1 bg-zinc-700 text-white text-sm px-3 py-1 rounded-full"
              >
                {ingredient.name}
                <button
                  onClick={() => removeIngredient(ingredient.id)}
                  className="ml-1 text-gray-400 hover:text-white leading-none"
                  aria-label={`Remove ${ingredient.name}`}
                >
                  ×
                </button>
              </span>
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
        
        {/* Weight */}
        <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
          500 g
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