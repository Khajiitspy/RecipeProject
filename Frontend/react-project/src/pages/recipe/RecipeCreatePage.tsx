import { useState } from "react";
import { useCreateRecipeMutation } from "../../api/recipeService";
import { useGetCategoriesQuery } from "../../api/categoryService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import IngredientInputs from "../../Components/Recipe/IngredientInputs";

export default function RecipeCreatePage() {
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [instruction, setInstruction] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const { data: categories = [] } = useGetCategoriesQuery();

  const [ingredients, setIngredients] = useState<IRecipeIngredientCreate[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid =
      name &&
      slug &&
      instruction &&
      categoryId &&
      ingredients.length > 0 &&
      ingredients.every(
        (i) => i.ingredientId && i.amount > 0 && i.ingredientUnitId
      );

    if(isValid){
      await createRecipe({
        name,
        slug,
        instruction,
        categoryId,
        image,
        ingredientsJson: JSON.stringify(ingredients),
      }).unwrap();

      alert("Recipe created!");

    }
    else {
        alert("Recipe invalid!");
    }

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

    <select
      value={categoryId || ""}
      onChange={(e) => setCategoryId(Number(e.target.value))}
      required
    >
      <option value="">Select category</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>

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
