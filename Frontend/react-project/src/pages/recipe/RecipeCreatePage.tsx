import { useState, useEffect } from "react";
import { useCreateRecipeMutation } from "../../api/recipeService";
import { useGetCategoriesQuery } from "../../api/categoryService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import IngredientInputs from "../../Components/Recipe/IngredientInputs";
import {slugify} from "../../utils/slugify.ts"
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import PageHeader from "../../Components/layout/PageHeader";

export default function RecipeCreatePage() {
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const { data: categories = [] } = useGetCategoriesQuery();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [ingredients, setIngredients] = useState<IRecipeIngredientCreate[]>([]);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRecipe({
        name,
        slug,
        instruction,
        categoryId,
        image,
        ingredientsJson: JSON.stringify(ingredients),
      }).unwrap();

      alert("Recipe created!");
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <Card>
          <PageHeader
            title="Create Recipe"
            subtitle="Share your cooking ideas"
          />
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1>Create Recipe</h1>

            <div className="space-y-1">
              <input
                className={`w-full px-4 py-3 rounded-xl border border-slate-200
                  focus:ring-2 focus:ring-amber-300/20
                  ${errors.Name ? "input-error" : ""}`}
                placeholder="Recipe name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <p className="text-sm text-slate-400">
                Slug: <span className="font-mono">{slug}</span>
              </p>
              <p className="text-xs text-slate-400 italic">
                This will be used in the recipe URL
              </p>
            </div>

            {errors.Name && <p className="error">{errors.Name[0]}</p>}

            <textarea className={`w-full px-4 py-3 rounded-xl border border-slate-200
                focus:ring-2 focus:ring-amber-300/20
                ${errors.Instruction ? "input-error" : ""}`}
              placeholder="Instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              required
            />
            {errors.Instruction && <p className="error">{errors.Instruction[0]}</p>}


            <select className={`w-full px-4 py-3 rounded-xl border border-slate-200
                focus:ring-2 focus:ring-amber-300/20
                ${errors.CategoryId ? "input-error" : ""}`}
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
            {errors.categoryId && <p className="error">{errors.categoryId[0]}</p>}

            <IngredientInputs ingredients={ingredients} setIngredients={setIngredients} />
            {errors.IngredientsJson && (
              <p className="error">{errors.IngredientsJson[0]}</p>
            )}


            <input className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-300/20"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            {errors.Image && <p className="error">{errors.Image[0]}</p>}

            <button type="submit" disabled={isLoading} className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition">
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}
