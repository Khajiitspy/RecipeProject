import { Link } from "react-router";
import { APP_ENV } from "../../env";
import Card from "../../Components/UI/Card";
import type {IRecipeItem} from "../../types/recipe/IRecipeItem.ts";
import {PortionSelector} from "../cart/PortionSelector.tsx";

interface RecipeCardProps {
    recipe: IRecipeItem;
    portions: number;
    onPortionChange: (recipeId: number, diff: number) => void;
}

export const RecipeCard = ({ recipe, portions, onPortionChange }: RecipeCardProps) => {
    const handleAction = (e: React.MouseEvent, diff: number) => {
        e.preventDefault();
        e.stopPropagation();
        onPortionChange(recipe.id, diff);
    };

    return (
        <Link to={`/recipes/${recipe.id}`}>
            <Card className="group cursor-pointer overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {recipe.image && (
                    <div className="overflow-hidden rounded-xl mb-4">
                        <img
                            src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`}
                            alt={recipe.name}
                            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="flex-1 pr-2 truncate">
                        <h3 className="text-xl font-semibold text-slate-800 group-hover:text-slate-900 truncate">
                            {recipe.name}
                        </h3>
                        {recipe.category && (
                            <p className="text-slate-500 mt-1 text-sm">{recipe.category.name}</p>
                        )}
                    </div>

                    <PortionSelector
                        count={portions}
                        onIncrease={(e) => handleAction(e, 1)}
                        onDecrease={(e) => handleAction(e, -1)}
                    />
                </div>
            </Card>
        </Link>
    );
};