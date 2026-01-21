import { useEffect, useRef, useState } from "react";
import { useGetIngredientsQuery } from "../../api/ingredientService";
import { useGetUnitsQuery } from "../../api/unitService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import type { IngredientItemModel } from "../../types/recipe/IIngredientItem";
import { APP_ENV } from "../../env";
import {HiChevronDown, HiOutlinePlus, HiOutlineTrash} from "react-icons/hi";

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
      <div ref={wrapperRef} className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
            Інгредієнти
          </h3>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {ingredients.length} позицій
        </span>
        </div>

        <div className="space-y-3">
          {ingredients.map((ing, idx) => {
            const suggestions = allIngredients.filter((i) =>
                i.name.toLowerCase().includes((inputValues[idx] || "").toLowerCase())
            );
            const selected = allIngredients.find(i => i.id === ing.ingredientId);

            return (
                <div key={idx} className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-amber-200 transition-all">

                  {/* Автокомпліт інгредієнта */}
                  <div className="relative w-full sm:flex-1">
                    <div className="relative flex items-center">
                      <div className="absolute left-3 z-10">
                        {selected?.image ? (
                            <img
                                src={`${APP_ENV.API_BASE_URL}/images/200_${selected.image}`}
                                className="w-7 h-7 rounded-lg object-cover shadow-sm"
                                alt=""
                            />
                        ) : (
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs">🥘</div>
                        )}
                      </div>
                      <input
                          type="text"
                          className="w-full pl-12 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all"
                          placeholder="Назва інгредієнта..."
                          value={inputValues[idx] || ""}
                          onChange={(e) => handleIngredientInput(idx, e.target.value)}
                          onFocus={() => setOpenIndex(idx)}
                      />
                    </div>

                    {/* Dropdown */}
                    {openIndex === idx && suggestions.length > 0 && (
                        <div className="absolute left-0 top-full z-50 mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-xl max-h-56 overflow-auto py-1 animate-in fade-in slide-in-from-top-2">
                          {suggestions.map((i) => (
                              <button
                                  key={i.id}
                                  type="button"
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => selectIngredient(idx, i)}
                                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 w-full text-left transition-colors"
                              >
                                <img
                                    src={i.image ? `${APP_ENV.API_BASE_URL}/images/200_${i.image}` : "/placeholder.png"}
                                    className="w-8 h-8 rounded-lg object-cover"
                                    alt=""
                                />
                                <span className="text-sm font-medium text-slate-700">{i.name}</span>
                              </button>
                          ))}
                        </div>
                    )}
                  </div>

                  {/* Кількість та Одиниці */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                        type="number"
                        placeholder="К-сть"
                        value={ing.amount || ""}
                        onChange={(e) => updateIngredientField(idx, "amount", Number(e.target.value))}
                        className="w-20 px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-center outline-none focus:bg-white focus:border-amber-400 transition-all"
                    />

                    <div className="relative flex-1 sm:w-28">
                      <select
                          value={ing.ingredientUnitId || ""}
                          onChange={(e) => updateIngredientField(idx, "ingredientUnitId", Number(e.target.value))}
                          className="w-full pl-3 pr-8 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none appearance-none cursor-pointer focus:bg-white focus:border-amber-400 transition-all"
                      >
                        <option value="">Од. вим.</option>
                        {units.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                      </select>
                      <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    <button
                        type="button"
                        onClick={() => removeRow(idx)}
                        className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </div>
            );
          })}
        </div>

        <button
            type="button"
            onClick={() => setIngredients([...ingredients, { ingredientId: 0, ingredientUnitId: 0, amount: 0 }])}
            className="w-full py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/30 transition-all flex items-center justify-center gap-2"
        >
          <HiOutlinePlus size={18} />
          Додати ще один інгредієнт
        </button>
      </div>
  );


}
