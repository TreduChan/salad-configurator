import { IngredientCard } from "./IngredientCard";

type Category = {
  id: number;
  name: string;
}

type Ingredient = {
  id: number;
  name: string;
  categoryId: number;
}

type Props = {
  categories: Category[];
  ingredients: Ingredient[];
}
export default function IngredientSection({ categories, ingredients}: Props) {
  const filteredCategories = categories.filter(c => c.id !==6);
  const filteredIngredients = ingredients.filter(i => i.categoryId !==6);

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      <input className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]" placeholder="Search ingredients..." />
      
      <div className="flex flex-wrap gap-4 mt-4">
          {filteredCategories.map(category => (
      <button key={category.id} className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full inline-block mt-4">
        {category.name}
      </button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {filteredIngredients.map(ingredient => (
        <IngredientCard key={ingredient.id} ingredient={ingredient}/>
      ))}
    </div>
    </div>
  );
}