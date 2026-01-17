import { useEffect, useState } from "react";
import { useGetIngredientsQuery } from "../../api/ingredientService";
import { useGetUnitsQuery } from "../../api/unitService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";

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

  // text shown in inputs
  const [inputValues, setInputValues] = useState<string[]>([""]);

  // keep inputValues in sync when rows are added/removed
  useEffect(() => {
    if (inputValues.length < ingredients.length + 1) {
      setInputValues((prev) => [...prev, ""]);
    }
  }, [ingredients.length]);

  const handleIngredientSelect = (index: number, name: string) => {
    const ingredient = allIngredients.find(
      (i) => i.name.toLowerCase() === name.toLowerCase()
    );

    const newInputs = [...inputValues];
    newInputs[index] = name;
    setInputValues(newInputs);

    if (!ingredient) return;

    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ingredientId: ingredient.id,
      ingredientUnitId: 0,
      amount: 0,
    };

    setIngredients(newIngredients);

    // auto-add next row
    if (index === ingredients.length) {
      setIngredients([...newIngredients]);
    }
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
    <div>
      <h3>Ingredients</h3>

      {ingredients.map((ing, idx) => {
        const suggestions = allIngredients.filter((i) =>
          i.name.toLowerCase().includes(inputValues[idx]?.toLowerCase() || "")
        );

        return (
          <div key={idx} style={{ marginBottom: 10 }}>
            <input
              type="text"
              placeholder="Ingredient"
              value={inputValues[idx] || ""}
              list={`ingredient-list-${idx}`}
              onChange={(e) =>
                handleIngredientSelect(idx, e.target.value)
              }
              style={{ width: 200 }}
            />

            <datalist id={`ingredient-list-${idx}`}>
              {suggestions.map((i) => (
                <option key={i.id} value={i.name} />
              ))}
            </datalist>

            <input
              type="number"
              placeholder="Amount"
              value={ing.amount || ""}
              onChange={(e) =>
                updateIngredientField(idx, "amount", Number(e.target.value))
              }
              style={{ width: 80, marginLeft: 8 }}
            />

          <select
            value={ing.ingredientUnitId || ""}
            onChange={(e) =>
              updateIngredientField(idx, "ingredientUnitId", Number(e.target.value))
            }
            style={{ marginLeft: 8 }}
          >
            <option value="">Unit</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>


            <button
              type="button"
              onClick={() => removeRow(idx)}
              style={{ marginLeft: 8 }}
            >
              ✕
            </button>
          </div>
        );
      })}

      {/* Empty row for adding new ingredient */}
      <input
        type="text"
        placeholder="Add ingredient..."
        value={inputValues[ingredients.length] || ""}
        list="ingredient-list-new"
        onChange={(e) =>
          handleIngredientSelect(ingredients.length, e.target.value)
        }
        style={{ width: 200 }}
      />

      <datalist id="ingredient-list-new">
        {allIngredients.map((i) => (
          <option key={i.id} value={i.name} />
        ))}
      </datalist>
    </div>
  );
}
