import { useState } from "react";
import { useIngredientStore } from "../store/useIngredientStore";
import SaveRecipeModal from "./SaveRecipeModal";
import divider4 from "../assets/jakaja_4_lohkoa.png";
import divider6 from "../assets/jakaja_6_lohkoa.png";



const CenterBowl = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const clearSelection = useIngredientStore((state) => state.clearSelection);
  const slots = useIngredientStore((state) => state.slots);
  const clearSlot = useIngredientStore((state) => state.clearSlot);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const totalSlots = selectedBowl?.slot_count ?? 6;


  const handleClear = () => {
    if (window.confirm('Are you sure you want to empty the bowl?')) {
      clearSelection();
    }
  };
   
  const dividerMap: Record<number, string> = {
  4: divider4,
  6: divider6,
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
                      onClick={() => setIsSaveModalOpen(true)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      aria-label="Save"
                    >
                      💾
                    </button>
                </div>
            </div>

    {/*kulho*/}
    <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex flex-wrap items-center justify-center gap-2 p-4 shadow-inner relative overflow-hidden">
  
  {/* BASE BACKGROUND */}
  {selectedBowl?.base_type_id && (
    <img
      src={selectedBowl.image_url}
      alt="base"
      className="absolute inset-0 w-full h-full object-cover z-10"
    />
  )}

  {/* DIVIDER OVERLAY */}
  {selectedBowl?.slot_count && (
  <img
    src={dividerMap[selectedBowl.slot_count] ?? divider6}
    alt="divider"
    className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
  />
  )}
 {Object.entries(slots)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slotKey, ingredient], index) => {
    if (!ingredient) return null;

    const angle = (360 / totalSlots) * index + (360 / totalSlots) / 2;

    return (
      <div
        key={slotKey}
        className="absolute z-30 flex flex-col items-center"
        style={{
          transform: `rotate(${angle}deg) translate(70px)`,
        }}
      >
        {/* WEDGE IMAGE */}
        <div style={{ transform: `rotate(-${angle}deg)` }} className="relative flex items-center justify-center">
        <img
          src={ingredient.wedge_image_url}
          alt={ingredient.name}
          className="w-12 h-12 object-contain"
        />

        {/* REMOVE BUTTON */}
        <button
          onClick={() => clearSlot(slotKey)}
          className="absolute -bottom-5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          ×
        </button>
      </div>
      </div>
    );
  })}
      </div>
  

     {/* Bottom Info */}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">100 g / 1,99 €</p>
        <p className="text-sm text-gray-500">{selectedBowl ? selectedBowl.volume : 0} ml</p>
      </div>

      <SaveRecipeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSaved={() => clearSelection()}
      />
    </div>
  );
};

export default CenterBowl;