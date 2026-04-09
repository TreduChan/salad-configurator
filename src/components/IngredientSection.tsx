import { useState } from "react";
import IngredientCard from "./IngredientCard";
import type {Ingredient, Category} from "../types";

type Props = {
  categories: Category[];
  ingredients: Ingredient[];
}

export default function IngredientSection({ categories, ingredients}: Props) {
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCategories = categories.filter(c => c.id !==6);
  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.categoryId !== 6 &&
      (activeCategory === 'all' ? true : ingredient.categoryId === activeCategory) &&
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">
      <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]" placeholder="Search ingredients..." />
      
      <div className="flex flex-wrap gap-4 mt-4">
          {filteredCategories.map(category => (
      <button key={category.id} onClick={() => setActiveCategory(category.id)} className="bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full inline-block mt-4">
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