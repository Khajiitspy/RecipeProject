import { useState, useEffect } from "react";
import { useGetIngredientsQuery } from "../../api/ingredientService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";

interface IngredientInputsProps {
  ingredients: IRecipeIngredientCreate[];
  setIngredients: (ingredients: IRecipeIngredientCreate[]) => void;
}

export default function IngredientInputs({ ingredients, setIngredients }: IngredientInputsProps) {
  const { data: allIngredients } = useGetIngredientsQuery();
  const [inputValues, setInputValues] = useState<string[]>([""]);

  // Filter ingredients for autocomplete
  const getSuggestions = (value: string) =>
    allIngredients?.filter((i) =>
      i.name.toLowerCase().includes(value.toLowerCase())
    ) || [];

  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputValues];
    newInputs[index] = value;
    setInputValues(newInputs);

    const newIngredients = [...ingredients];
    if (!newIngredients[index]) newIngredients[index] = { ingredientId: 0, ingredientUnitId: 0, amount: 0 };
    const matched = allIngredients?.find(i => i.name.toLowerCase() === value.toLowerCase());
    if (matched) newIngredients[index].ingredientId = matched.id;
    setIngredients(newIngredients);

    // Add new empty input if last is filled
    if (index === inputValues.length - 1 && value.trim() !== "") {
      setInputValues([...newInputs, ""]);
    }
  };

  return (
    <div>
      {inputValues.map((val, idx) => {
        const suggestions = getSuggestions(val);

        return (
          <div key={idx} style={{ marginBottom: 8 }}>
            <input
              type="text"
              placeholder="Ingredient"
              value={val}
              onChange={(e) => handleChange(idx, e.target.value)}
              list={`ingredient-suggestions-${idx}`}
              style={{ width: 200 }}
            />
            <datalist id={`ingredient-suggestions-${idx}`}>
              {suggestions.map((s) => (
                <option key={s.id} value={s.name} />
              ))}
            </datalist>

            {ingredients[idx]?.amount !== undefined && (
              <input
                type="number"
                placeholder="Amount"
                value={ingredients[idx]?.amount || ""}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[idx].amount = Number(e.target.value);
                  setIngredients(newIngredients);
                }}
                style={{ width: 80, marginLeft: 8 }}
              />
            )}

            {ingredients[idx]?.ingredientUnitId !== undefined && (
              <input
                type="number"
                placeholder="Unit ID"
                value={ingredients[idx]?.ingredientUnitId || ""}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[idx].ingredientUnitId = Number(e.target.value);
                  setIngredients(newIngredients);
                }}
                style={{ width: 80, marginLeft: 8 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
