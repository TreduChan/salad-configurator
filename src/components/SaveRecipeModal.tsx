import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Modal from "./Modal";
import { saveRecipe } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";
import { useIngredientStore } from "../store/useIngredientStore";

type SaveRecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
};

export default function SaveRecipeModal({
  isOpen,
  onClose,
  onSaved,
}: SaveRecipeModalProps) {
  const [recipeName, setRecipeName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const token = useAuthStore((state) => state.token);
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);

  useEffect(() => {
    if (!isOpen) return;
    setRecipeName("");
    setIsPublic(false);
    setError(null);
    setSuccess(false);
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = recipeName.trim();
    if (!trimmedName) {
      setError("Recipe name is required.");
      return;
    }

    if (!token) {
      setError("You must be logged in to save a recipe.");
      return;
    }

    if (!selectedBowl) {
      setError("Please select a bowl before saving.");
      return;
    }

    const ingredientIds = Object.values(slots)
      .filter((ingredient) => ingredient !== null)
      .map((ingredient) => ingredient.id);

    if (ingredientIds.length === 0) {
      setError("Please add at least one ingredient before saving.");
      return;
    }

    setError(null);
    setIsSaving(true);

    try {
      await saveRecipe(token, {
        name: trimmedName,
        bowlId: selectedBowl.id,
        ingredientIds,
        isPublic,
      });

      setSuccess(true);
      onSaved?.();
      setTimeout(() => onClose(), 1500);
    } catch {
      setError("Failed to save recipe. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-[320px]">
        <h2 className="text-xl font-semibold">Save Recipe</h2>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Recipe Name</span>
          <input
            type="text"
            value={recipeName}
            onChange={(event) => setRecipeName(event.target.value)}
            placeholder="Enter recipe name"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(event.target.checked)}
          />
          <span>Make Public</span>
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600 font-medium">Recipe saved!</p>}

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded bg-[#A2D135] text-black font-semibold disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
