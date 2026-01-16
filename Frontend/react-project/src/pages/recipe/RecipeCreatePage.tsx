import { useState } from "react";
import { useCreateRecipeMutation } from "../../api/recipeService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import IngredientInputs from "../../Components/Recipe/IngredientInputs";

export default function RecipeCreatePage() {
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [instruction, setInstruction] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const [ingredients, setIngredients] = useState<IRecipeIngredientCreate[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createRecipe({
      name,
      slug,
      instruction,
      categoryId,
      image,
      ingredientsJson: JSON.stringify(ingredients),
    }).unwrap();

    alert("Recipe created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Recipe</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />

      <textarea
        placeholder="Instruction"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Category Id"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        required
      />

      <IngredientInputs ingredients={ingredients} setIngredients={setIngredients} />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
