import type { Bowl } from "../types";
import { useIngredientStore } from "../store/useIngredientStore";

type Props = {
  bowls: Bowl[];
}

const BowlSelection = ({bowls} : Props) => {
  const setBowl = useIngredientStore((state) => state.setBowl);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);

    return (
        <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
        
        <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">1</div>
        
        <h2 className="mb-4 text-lg font-semibold"></h2>
      
      <div className="w-full space-y-3">
        {bowls.map((bowl) => (
          <button
            key={bowl.id}
            onClick={() => setBowl(bowl)}
            className={`h-12 border-2 rounded-xl flex items-center px-4 transition-colors ${
              selectedBowl?.id === bowl.id
                ? "border-[#A2D135] text-[#A2D135]"
                : "border-gray-600 text-white"
            }`}
          >
          {bowl.name}
          </button>
        ))}
        </div>
      </div>
  );
};
export default BowlSelection;