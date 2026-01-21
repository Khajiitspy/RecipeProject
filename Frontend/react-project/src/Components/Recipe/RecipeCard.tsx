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
        <Link to={`/recipes/${recipe.id}`} className="block group">
            <Card className="p-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-lg shadow-gray-200/50 dark:shadow-none transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 dark:hover:border-yellow-400/50 cursor-pointer overflow-hidden relative">

                {/* КОНТЕЙНЕР ДЛЯ ЗОБРАЖЕННЯ */}
                {recipe.image && (
                    <div className="overflow-hidden rounded-[1.5rem] mb-5 relative aspect-video">
                        <img
                            src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`}
                            alt={recipe.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Градієнтна маска для кращого вигляду в темній темі */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                )}

                {/* ТЕКСТОВА ЧАСТИНА ТА СЕЛЕКТОР ПОРЦІЙ */}
                <div className="flex justify-between items-center px-1">
                    <div className="flex-1 pr-3 truncate">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tighter group-hover:text-yellow-500 transition-colors truncate">
                            {recipe.name}
                        </h3>
                        {recipe.category && (
                            <p className="text-[10px] font-black uppercase tracking-widest text-yellow-600 dark:text-yellow-400 mt-1">
                                {recipe.category.name}
                            </p>
                        )}
                    </div>

                    {/* Порції (Важливо: зупиняємо спливання події, щоб клік на + не відкривав сторінку рецепта) */}
                    <div onClick={(e) => e.preventDefault()} className="relative z-20">
                        <PortionSelector
                            count={portions}
                            onIncrease={(e) => handleAction(e, 1)}
                            onDecrease={(e) => handleAction(e, -1)}
                        />
                    </div>
                </div>
            </Card>
        </Link>
    );
};