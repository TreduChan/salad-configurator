import type { Ingredient } from '../types'
import { useIngredientStore } from '../store/useIngredientStore'

interface Props {
  ingredient: Ingredient
}

export default function IngredientCard({ ingredient }: Props) {
  const addIngredient = useIngredientStore((s) => s.addIngredient)

  return (
    <div
      className="w-40 h-40 bg-white rounded-lg shadow-md p-3 flex flex-col justify-between cursor-pointer"
      onClick={() => addIngredient(ingredient)}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">{ingredient.categoryId}</div>
          <div className="text-lg font-semibold truncate">{ingredient.name}</div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        {ingredient.diets?.map((d) => (
          <span
            key={d}
            className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}
