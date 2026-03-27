type Ingredients = {
  id: number;
  name: string;
}

type Props = {
  base: Ingredients[];
}

const BaseSelection = ({ base } : Props) => {
    return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

    <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">2</div>
    
    <div className="w-full space-y-3">
      {base.map((base) => (
        <button key={base.id} className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          {base.name}
        </button>
      ))}
        </div>
    </div>
    );
};
export default BaseSelection;