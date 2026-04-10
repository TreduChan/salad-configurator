import { useIngredientStore } from "../store/useIngredientStore";

const CenterBowl = () => {
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);
  const activeIngredients = Object.values(slots).filter((i): i is NonNullable<typeof i> => i !== null);

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
                    <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🥗
                    </span>
                    <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🥄
                    </span>
                </div>
            </div>

    {/*kulho*/}
    <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex flex-wrap items-center justify-center gap-2 p-6 shadow-inner relative overflow-hidden">
      {activeIngredients.map((ingredient) => (
        <span
          key={ingredient.id}
          className="bg-[#A2D135] text-black text-xs font-semibold px-3 py-1 rounded-full"
        >
          {ingredient.name}
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