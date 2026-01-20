import { useEffect, useRef, useState } from "react";
import { useGetIngredientsQuery } from "../../api/ingredientService";
import { useGetUnitsQuery } from "../../api/unitService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import type { IngredientItemModel } from "../../types/recipe/IIngredientItem";
import { APP_ENV } from "../../env";

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
    <div ref={wrapperRef} className="space-y-3">
      <h3 className="font-semibold">Ingredients</h3>

      {ingredients.map((ing, idx) => {
        const suggestions = allIngredients.filter((i) =>
          i.name.toLowerCase().includes((inputValues[idx] || "").toLowerCase())
        );

        const selectedIngredient = allIngredients.find(
          i => i.id === ing.ingredientId
        );

        return (
          <div key={idx} className="flex items-center gap-2">
            {/* Ingredient input + image */}
            <div className="relative w-64 flex items-center gap-2">
              {selectedIngredient?.image && (
                <img
                  src={`${APP_ENV.API_BASE_URL}/images/200_${selectedIngredient.image}`}
                  alt={selectedIngredient.name}
                  className="w-8 h-8 rounded object-cover"
                />
              )}

              <input
                type="text"
                className="input w-full"
                placeholder="Ingredient"
                value={inputValues[idx] || ""}
                onChange={(e) =>
                  handleIngredientInput(idx, e.target.value)
                }
                onFocus={() => setOpenIndex(idx)}
              />

              {openIndex === idx && suggestions.length > 0 && (
                <div className="absolute left-0 top-full z-20 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-48 overflow-auto">
                  {suggestions.map((i) => (
                    <button
                      key={i.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()} // prevent blur
                      onClick={() => selectIngredient(idx, i)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 w-full text-left"
                    >
                      <img
                        src={
                          i.image
                            ? `${APP_ENV.API_BASE_URL}/images/200_${i.image}`
                            : "/placeholder.png"
                        }
                        className="w-8 h-8 rounded object-cover"
                        alt={i.name}
                      />
                      <span>{i.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Amount */}
            <input
              type="number"
              placeholder="Amount"
              value={ing.amount || ""}
              onChange={(e) =>
                updateIngredientField(idx, "amount", Number(e.target.value))
              }
              className="w-20 input"
            />

            {/* Unit */}
            <select
              value={ing.ingredientUnitId || ""}
              onChange={(e) =>
                updateIngredientField(idx, "ingredientUnitId", Number(e.target.value))
              }
              className="input"
            >
              <option value="">Unit</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* Remove */}
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        );
      })}

      {/* Initial row */}
      {ingredients.length === 0 && (
        <button
          type="button"
          onClick={() =>
            setIngredients([{ ingredientId: 0, ingredientUnitId: 0, amount: 0 }])
          }
          className="text-sm text-amber-600 hover:underline"
        >
          + Add ingredient
        </button>
      )}
    </div>
  );
}
