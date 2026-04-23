import { useEffect, useState } from "react";
import Modal from "./Modal";

type SaveRecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipeName: string, isPublic: boolean) => void;
  initialRecipeName?: string;
  initialIsPublic?: boolean;
};

export default function SaveRecipeModal({
  isOpen,
  onClose,
  onSave,
  initialRecipeName = "",
  initialIsPublic = false,
}: SaveRecipeModalProps) {
  const [recipeName, setRecipeName] = useState(initialRecipeName);
  const [isPublic, setIsPublic] = useState(initialIsPublic);

  useEffect(() => {
    if (!isOpen) return;
    setRecipeName(initialRecipeName);
    setIsPublic(initialIsPublic);
  }, [isOpen, initialRecipeName, initialIsPublic]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = recipeName.trim();
    if (!trimmedName) return;

    onSave(trimmedName, isPublic);
    onClose();
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
            disabled={!recipeName.trim()}
            className="px-4 py-2 rounded bg-[#A2D135] text-black font-semibold disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
