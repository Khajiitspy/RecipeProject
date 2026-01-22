import { useState, useEffect } from "react";
import { useCreateRecipeMutation } from "../../api/recipeService";
import { useGetCategoriesQuery } from "../../api/categoryService";
// @ts-ignore
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import IngredientInputs from "../../Components/recipe/IngredientInputs";
import {slugify} from "../../utils/slugify.ts"
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import PageHeader from "../../Components/layout/PageHeader";
import { Select, ConfigProvider } from 'antd';
import { HiChevronDown } from "react-icons/hi";
import AnimatedPage from "../../Components/layout/AnimatedPage.tsx"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function RecipeCreatePage() {
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  // @ts-ignore
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

      alert("recipe created!");
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  return (
    <AnimatedPage>
      <PageContainer>
        <div className="max-w-5xl mx-auto py-10 px-4 md:px-6">
          <Card
              className="
              -mt-15 rounded-[2.5rem] overflow-hidden transition-all
              bg-white
              border border-yellow-400/30
              shadow-xl shadow-gray-300/40
              dark:bg-gray-900
              dark:border-gray-800
              dark:shadow-none"
          >
            <div className="p-8 md:p-12">
              <PageHeader
                  title="Створення рецепту"
                  subtitle="Поділіться своїм кулінарним шедевром з родиною EatLog"

              />

              <form onSubmit={handleSubmit} className="mt-6 space-y-10">
                {/* Головна сітка на дві колонки */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">

                  {/* ЛІВА КОЛОНКА */}
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
                      <div className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 w-fit">
                        <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">URL:</span>
                        <span className="text-xs font-mono text-yellow-600 dark:text-yellow-400 truncate max-w-[200px]">{slug || "..."}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest ml-1">Категорія</label>
                      <ConfigProvider
                          theme={{
                            token: {
                              colorPrimary: '#facc15', // yellow-400
                              borderRadius: 16,
                              controlHeight: 56,
                              colorBgContainer: 'transparent',
                              colorText: 'inherit',
                            },
                          }}
                      >
                        <Select
                            placeholder="Оберіть категорію"
                            className="w-full "
                            suffixIcon={<HiChevronDown className="text-gray-400" />}
                            options={categories.map(c => ({ value: c.id, label: c.name }))}
                            onChange={(value) => setCategoryId(value)}
                        />
                      </ConfigProvider>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest ml-1">Фото страви</label>
                      <input
                          className="w-full px-5 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 file:mr-4 file:py-1.5 file:px-4
                    file:rounded-xl file:border-0 file:text-xs file:font-black
                    file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-500 cursor-pointer transition-all"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col h-full">
                    <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest ml-1 transition-colors duration-300">
                      Інструкція приготування
                    </label>
                    <textarea
                        className={`w-full flex-grow px-5 py-4 rounded-2xl border outline-none transition-all duration-300 resize-none 
                        /* Базові кольори тексту */
                        text-gray-900 dark:text-gray-100 
                        /* Налаштування плейсхолдера */
                        placeholder:text-gray-400 dark:placeholder:text-gray-600                   
                        ${errors.Instruction
                            ? "border-red-500 bg-red-50 dark:bg-red-500/10"
                            : `bg-gray-50 dark:bg-gray-900/50 
                           border-gray-100 dark:border-gray-800 
                           focus:border-yellow-400 dark:focus:border-yellow-400 
                            focus:ring-4 focus:ring-yellow-400/10`
                        }`}
                        placeholder="Крок за кроком опишіть процес..."
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        required
                    />
                  </div>



                </div>


                <div className="pt-10 border-t border-gray-100 dark:border-gray-800">
                  <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest ml-1">Список інгредієнтів</label>
                  <div className="bg-gray-50/50 dark:bg-gray-800/30 p-8 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <IngredientInputs ingredients={ingredients} setIngredients={setIngredients} />
                  </div>
                </div>


                <div className="flex justify-end pt-6">
                  <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full lg:w-1/3 bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98]
                text-gray-950 font-black py-5 rounded-2xl shadow-xl
                shadow-yellow-400/20 transition-all duration-300 flex justify-center items-center gap-3"
                  >
                    {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    ) : (
                        <>
                          <span>Створити</span>
                        </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </PageContainer>
    </AnimatedPage>
  );
}
