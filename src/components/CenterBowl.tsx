import react from 'react';

const CenterBowl = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">

            {/*ylin nappulat*/}
            <div className="flex gap-3  mb-6 items-center">
                <button className="px-4 py-2 bg-gray-300 rounded-full text-sm font-medium">
                Salaatti
                </button>
                <button className="px-4 py-2 bg-gray-300 rounded-full text-sm font-medium">
                Rahka 
                </button>
                <div classname="flex gap-2">
                    <span classname="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🥗
                    </span>
                    <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    🥄
                    </span>
                </div>
            </div>

    {/*kulho*/}
    <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative">
    {/* Optional inner content */}
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