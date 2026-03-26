export default function IngredientSection() {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      <input className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]" />
      <div className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full inline-block mt-4">Category</div>
    </div>
  );
}