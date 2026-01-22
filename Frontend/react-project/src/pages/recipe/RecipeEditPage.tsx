import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetRecipeByIdQuery,
  useUpdateRecipeMutation,
} from "../../api/recipeService";
import { useGetCategoriesQuery } from "../../api/categoryService";
import IngredientInputs from "../../Components/Recipe/IngredientInputs";
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import PageHeader from "../../Components/layout/PageHeader";
import { slugify } from "../../utils/slugify";
import {APP_ENV} from "../../env";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCheck, faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function RecipeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recipeId = Number(id);

  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId);
  const [updateRecipe, { isLoading: isSaving }] =
    useUpdateRecipeMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [name, setName] = useState("");
  // @ts-ignore
  const [slug, setSlug] = useState("");
  const [instruction, setInstruction] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  /** Prefill data */
  useEffect(() => {
    if (!recipe) return;

    setName(recipe.name);
    setSlug(recipe.slug);
    setInstruction(recipe.instruction);
    setCategoryId(recipe.category?.id);
    setIngredients(
      recipe.ingredients?.map((i) => ({
        ingredientId: i.ingredient?.id,
        ingredientUnitId: i.unit?.id,
        amount: i.amount,
      })) || []
    );
    if (recipe.image) {
      setImagePreview(
        `${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`
      );
    }
  }, [recipe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", recipeId.toString());
    formData.append("Name", name);
    formData.append("Slug", slugify(name));
    formData.append("Instruction", instruction);
    formData.append("CategoryId", String(categoryId ?? ""));
    formData.append("IngredientsJson", JSON.stringify(ingredients));

    if (image) {
      formData.append("Image", image);
    }

    try {
      await updateRecipe(formData).unwrap();
      navigate(`/recipes/${recipeId}`);
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
      <PageContainer>

        <div className="mb-8">
          <button
              onClick={() => navigate(-1)}
              className="group text-gray-400 hover:text-yellow-500 transition-colors flex items-center gap-3 font-bold uppercase text-xs tracking-widest cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all">
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            Назад до рецепту
          </button>
        </div>

        <div className="max-w-5xl mx-auto py-10 px-4 md:px-6">
          <Card className="shadow-xl shadow-gray-200/50 dark:shadow-none bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 md:p-12">
              <PageHeader
                  title="Редагування рецепту"
                  subtitle="Оновіть інформацію про ваш кулінарний шедевр"
              />

              <form onSubmit={handleSubmit} className="mt-10 space-y-10">
                {/* Головна сітка на дві колонки */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">

                  {/* ЛІВА КОЛОНКА: Назва, Категорія, Фото */}
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest ml-1">
                        Назва рецепта
                      </label>
                      <input
                          className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all text-gray-900 dark:text-white
                    ${errors.Name
                              ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                              : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10"}`}
                          placeholder="Наприклад: Гарбузовий суп"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                      {errors.Name && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.Name[0]}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest ml-1">Категорія</label>
                      <select
                          value={categoryId ?? ""}
                          onChange={(e) => setCategoryId(Number(e.target.value))}
                          className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="dark:bg-gray-900">Оберіть категорію</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id} className="dark:bg-gray-900">
                              {c.name}
                            </option>
                        ))}
                      </select>
                      {errors.CategoryId && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.CategoryId[0]}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest ml-1">Фото страви</label>
                      <input
                          className="w-full px-5 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 file:mr-4 file:py-1.5 file:px-4
                    file:rounded-xl file:border-0 file:text-xs file:font-black
                    file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-500 cursor-pointer transition-all"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setImage(file);
                            setImagePreview(URL.createObjectURL(file));
                          }}
                      />
                      {image && <p className="text-yellow-500 text-[10px] font-black uppercase tracking-tighter mt-2 ml-1">Нове фото обрано</p>}
                    </div>
                  </div>

                  {/* ПРАВА КОЛОНКА: Інструкції */}
                  <div className="flex flex-col h-full">
                    <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest ml-1">Інструкція приготування</label>
                    <textarea
                        className={`w-full flex-grow px-5 py-4 rounded-2xl border outline-none transition-all resize-none text-gray-900 dark:text-white min-h-[250px]
                  ${errors.Instruction
                            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10"}`}
                        placeholder="Опишіть процес приготування..."
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        required
                    />
                    {errors.Instruction && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.Instruction[0]}</p>}
                  </div>
                </div>

                {/* ПОПЕРЕДНІЙ ПЕРЕГЛЯД ФОТО */}
                {imagePreview && (
                    <div className="relative group rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg max-h-[300px]">
                      <img
                          src={imagePreview}
                          alt="Recipe Preview"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                )}

                {/* ІНГРЕДІЄНТИ (на всю ширину) */}
                <div className="pt-10 border-t border-gray-100 dark:border-gray-800">
                  <IngredientInputs
                      ingredients={ingredients}
                      setIngredients={setIngredients}
                  />
                  {errors.IngredientsJson && (
                      <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.IngredientsJson[0]}</p>
                  )}
                </div>

                {/* Кнопка збереження */}
                <div className="flex justify-end pt-6">
                  <button
                      disabled={isSaving}
                      className="w-full lg:w-1/3 bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98]
                text-gray-950 font-black py-5 rounded-2xl shadow-xl
                shadow-yellow-400/20 transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50"
                  >
                    {isSaving ? (
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    ) : (
                        <>
                          <FontAwesomeIcon icon={faCheck} />
                          <span>Зберегти зміни</span>
                        </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </PageContainer>
  );
}
