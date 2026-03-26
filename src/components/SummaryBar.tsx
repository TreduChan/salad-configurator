import React from "react";

const SummaryBar: React.FC = () => {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      
      {/* Left: Selected Ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-2">Selected ingredients</h3>
        <p className="text-sm text-gray-300">
          No ingredients selected
        </p>
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