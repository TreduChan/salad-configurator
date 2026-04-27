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
      <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="bg-white rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]" placeholder="Search ingredients..." />
      
      <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`font-bold px-6 py-2 rounded-full inline-block mt-4 ${
              activeCategory === 'all'
                ? 'bg-[#A2D135] text-black ring-2 ring-white'
                : 'bg-zinc-600 text-white'
            }`}
          >
            All
          </button>
          {filteredCategories.map(category => (
      <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`font-bold px-6 py-2 rounded-full inline-block mt-4 ${
        activeCategory === category.id
          ? 'bg-[#A2D135] text-black ring-2 ring-white'
          : 'bg-zinc-600 text-white'
      }`}>
        {category.name}
      </button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {filteredIngredients.map(ingredient => (
        <IngredientCard key={ingredient.id} ingredient={ingredient}/>
      ))}
    </div>

    <div className="mt-8 border-t border-zinc-700 pt-4">
      <p className="text-sm text-zinc-300 mb-3">Dietary legend</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full border border-zinc-500 px-3 py-1">G = Gluten-free</span>
        <span className="rounded-full border border-zinc-500 px-3 py-1">L = Lactose-free</span>
        <span className="rounded-full border border-zinc-500 px-3 py-1">V = Vegan</span>
      </div>
    </div>
    </div>
  );
}
