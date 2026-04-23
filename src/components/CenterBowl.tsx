import { useIngredientStore } from "../store/useIngredientStore";



const CenterBowl = () => {
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const clearSelection = useIngredientStore((state) => state.clearSelection);
  const slots = useIngredientStore((state) => state.slots);
  const activeIngredients = Object.values(slots).filter((i) => i !== null);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to empty the bowl?')) {
      clearSelection();
    }
  };

   

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">

            {/*ylin nappulat*/}
            <div className="flex gap-3  mb-6 items-center">
              <button onClick={() => setBaseType(1)} className="px-4 py-2 bg-gray-300 rounded-full text-sm font-medium">
                Salaatti
                </button>
              <button onClick={() => setBaseType(2)} className="px-4 py-2 bg-gray-300 rounded-full text-sm font-medium">
                Rahka 
                </button>
                <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      aria-label="Empty bowl"
                    >
                      🗑️
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Feature coming soon!')}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      aria-label="Undo"
                    >
                      ↩️
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Feature coming soon!')}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      aria-label="Save"
                    >
                      💾
                    </button>
                </div>
            </div>

    {/*kulho*/}
    <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex flex-wrap items-center justify-center gap-2 p-4 shadow-inner relative overflow-auto">
     {activeIngredients.length === 0 && (
          <span className="text-gray-400 text-sm">
            Valitse ainesosia
          </span>
        )}

        {activeIngredients.map((ingredient, index) => (
          <span key={index} className="px-3 py-1 bg-green-200 text-green-800 text-sm rounded-full">
            {typeof ingredient === "string" ? ingredient : ingredient.name}
          </span>
        ))}
    </div>

     {/* Bottom Info */}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">100 g / 1,99 €</p>
        <p className="text-sm text-gray-500">500 ml</p>
      </div>
    </div>
  );
};

export default CenterBowl;