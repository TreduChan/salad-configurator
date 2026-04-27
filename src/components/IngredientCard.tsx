import type { Ingredient } from '../types'
import { useIngredientStore } from '../store/useIngredientStore'
import { usePriceStore } from "../store/usePricesStore";
import { useAuthStore } from "../store/useAuthStore";



interface Props {
  ingredient: Ingredient
}

export default function IngredientCard({ ingredient }: Props) {
  const addIngredient = useIngredientStore((s) => s.addIngredient)

    const prices = usePriceStore((s) => s.prices);
    const token = useAuthStore((s) => s.token);
    const isLoggedIn = !!token;
    const priceItem = prices.find((p) => String(p.item_id) === String(ingredient.id));


  return (
    <div
      className="w-50 h-40 bg-white rounded-lg shadow-md p-3 flex flex-col justify-between cursor-pointer"
      onClick={() => addIngredient(ingredient)}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">{ingredient.categoryId}</div>
          <div className="text-black font-semibold truncate">{ingredient.name}</div>

      <div className="text-sm mt-1 text-green-600 font-medium">
            {isLoggedIn ? (
              priceItem ? (
                <>+ {priceItem.price.toFixed(2)} €</>
              ) : (
                <>Price not available</>
              )
            ) : (
              <>Login to see price</>
            )}
          </div>
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
