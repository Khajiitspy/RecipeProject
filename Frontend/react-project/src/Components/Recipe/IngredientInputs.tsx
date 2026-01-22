import { useEffect, useRef, useState } from "react";
import { useGetIngredientsQuery } from "../../api/ingredientService";
import { useGetUnitsQuery } from "../../api/unitService";

// @ts-ignore
import type { IngredientItemModel } from "../../types/recipe/IIngredientItem";
import { APP_ENV } from "../../env";
import {HiChevronDown, HiOutlinePlus, HiOutlineTrash} from "react-icons/hi";
import type {IRecipeIngredientCreate} from "../../types/recipe/IRecipeIngredientCreate.ts";

interface IngredientInputsProps {
  ingredients: IRecipeIngredientCreate[];
  setIngredients: (ingredients: IRecipeIngredientCreate[]) => void;
}

export default function IngredientInputs({
  ingredients,
  setIngredients,
}: IngredientInputsProps) {
  const { data: allIngredients = [] } = useGetIngredientsQuery();
  const { data: units = [] } = useGetUnitsQuery();

  const [inputValues, setInputValues] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // click outside → close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // keep text in sync with selected ingredient
  useEffect(() => {
    setInputValues(
      ingredients.map((ing) => {
        const found = allIngredients.find(i => i.id === ing.ingredientId);
        return found?.name || "";
      })
    );
  }, [ingredients, allIngredients]);

  const handleIngredientInput = (index: number, value: string) => {
    const newInputs = [...inputValues];
    newInputs[index] = value;
    setInputValues(newInputs);
    setOpenIndex(index);
  };

  const selectIngredient = (index: number, ingredient: IngredientItemModel) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ingredientId: ingredient.id,
      ingredientUnitId: 0,
      amount: newIngredients[index]?.amount || 0,
    };

    // auto-add new blank row
    if (index === ingredients.length - 1) {
      newIngredients.push({
        ingredientId: 0,
        ingredientUnitId: 0,
        amount: 0,
      });
    }

    setIngredients(newIngredients);

    const newInputs = [...inputValues];
    newInputs[index] = ingredient.name;
    setInputValues(newInputs);

    setOpenIndex(null);
  };

  const updateIngredientField = (
    index: number,
    field: keyof IRecipeIngredientCreate,
    value: number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value,
    };
    setIngredients(newIngredients);
  };

  const removeRow = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    setInputValues(inputValues.filter((_, i) => i !== index));
  };


  return (
      <div ref={wrapperRef} className="space-y-6">
        {/* Заголовок та лічильник позицій */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
            Інгредієнти
          </h3>
          <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
          {ingredients.length} позицій
        </span>
        </div>

        <div className="space-y-4 transition-colors duration-300">
          <div className="flex flex-col gap-4">
            {ingredients.map((ing, idx) => {
              // Фільтрація підказок на основі вводу
              const suggestions = allIngredients.filter((i) =>
                  i.name.toLowerCase().includes((inputValues[idx] || "").toLowerCase())
              );
              const selected = allIngredients.find(i => i.id === ing.ingredientId);

              return (
                  <div
                      key={idx}
                      className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-[1.5rem] shadow-sm hover:border-yellow-400 dark:hover:border-yellow-400/50 transition-all duration-300"
                  >
                    {/* АВТОКОМПЛІТ ІНГРЕДІЄНТА */}
                    <div className="relative w-full sm:flex-1">
                      <div className="relative flex items-center">
                        <div className="absolute left-4 z-10">
                          {selected?.image ? (
                              <img
                                  src={`${APP_ENV.API_BASE_URL}/images/200_${selected.image}`}
                                  className="w-8 h-8 rounded-xl object-cover shadow-sm border border-gray-200 dark:border-gray-700"
                                  alt=""
                              />
                          ) : (
                              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm shadow-inner">
                                🥘
                              </div>
                          )}
                        </div>
                        <input
                            type="text"
                            className="w-full pl-14 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            placeholder="Назва інгредієнта..."
                            value={inputValues[idx] || ""}
                            onChange={(e) => handleIngredientInput(idx, e.target.value)}
                            onFocus={() => setOpenIndex(idx)}
                        />
                      </div>

                      {/* ВИПАДАЮЧИЙ СПИСОК (Dropdown) */}
                      {openIndex === idx && suggestions.length > 0 && (
                          <div className="absolute left-0 top-full z-50 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl max-h-64 overflow-auto py-2 animate-in fade-in slide-in-from-top-2">
                            {suggestions.map((i) => (
                                <button
                                    key={i.id}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => selectIngredient(idx, i)}
                                    className="flex items-center gap-4 px-4 py-3 hover:bg-yellow-50 dark:hover:bg-yellow-400/10 w-full text-left transition-colors group/item"
                                >
                                  <img
                                      src={i.image ? `${APP_ENV.API_BASE_URL}/images/200_${i.image}` : "/placeholder.png"}
                                      className="w-10 h-10 rounded-xl object-cover shadow-sm border border-gray-100 dark:border-gray-800"
                                      alt=""
                                  />
                                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover/item:text-yellow-600 dark:group-hover/item:text-yellow-400">
                                  {i.name}
                                </span>
                                </button>
                            ))}
                          </div>
                      )}
                    </div>

                    {/* КІЛЬКІСТЬ ТА ОДИНИЦІ */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <input
                          type="number"
                          placeholder="К-сть"
                          value={ing.amount || ""}
                          onChange={(e) => updateIngredientField(idx, "amount", Number(e.target.value))}
                          className="w-24 px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm text-center text-gray-900 dark:text-white font-bold outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-yellow-400 transition-all"
                      />

                      <div className="relative flex-1 sm:w-36">
                        <select
                            value={ing.ingredientUnitId || ""}
                            onChange={(e) => updateIngredientField(idx, "ingredientUnitId", Number(e.target.value))}
                            className="w-full pl-4 pr-10 py-3.5 bg-gray-50/50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white font-medium outline-none appearance-none cursor-pointer focus:bg-white dark:focus:bg-gray-800 focus:border-yellow-400 transition-all"
                        >
                          <option value="" className="dark:bg-gray-900 text-gray-400">Од. вим.</option>
                          {units.map((u) => (
                              <option key={u.id} value={u.id} className="dark:bg-gray-900">{u.name}</option>
                          ))}
                        </select>
                        <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-yellow-500 transition-colors" />
                      </div>

                      {/* Кнопка видалення */}
                      <button
                          type="button"
                          onClick={() => removeRow(idx)}
                          className="p-3.5 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all active:scale-90"
                      >
                        <HiOutlineTrash size={22} />
                      </button>
                    </div>
                  </div>
              );
            })}
          </div>


          <button
              type="button"
              onClick={() => setIngredients([...ingredients, { ingredientId: 0, ingredientUnitId: 0, amount: 0 }])}
              className="w-full py-5 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[1.5rem] text-gray-400 dark:text-gray-500 font-black uppercase text-[11px] tracking-widest hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50/30 dark:hover:bg-yellow-400/5 transition-all flex items-center justify-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition-colors">
              <HiOutlinePlus size={18} />
            </div>
            <span>Додати інгредієнт</span>
          </button>
        </div>
      </div>
  );


}
