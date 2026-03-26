const BaseSelection = () => {
    return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

    <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">2</div>
    
    <div className="w-full space-y-3">
        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          {/* empty placeholder */}
        </div>

        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          {/* empty placeholder */}
        </div>
        </div>
    </div>
    );
};
export default BaseSelection;