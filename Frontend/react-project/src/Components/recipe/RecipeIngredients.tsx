import { APP_ENV } from "../../env";
import type {IRecipeIngredientItem} from "../../types/recipe/IRecipeIngredientItem.ts";

export const RecipeIngredients = ({ ingredients }: { ingredients: IRecipeIngredientItem[] }) => (
    <div className="md:col-span-1">
        <h2 className="text-xl font-bold dark:text-white text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6  bg-amber-400 rounded-full"></span>
            Інгредієнти
        </h2>
        <ul className="space-y-3">
            {ingredients?.map((i) => (
                <li key={i.id} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-200 hover:bg-white transition-all duration-300 shadow-sm group">
                    {i.ingredient?.image && (
                        <img
                            src={`${APP_ENV.API_BASE_URL}/images/100_${i.ingredient.image}`}
                            alt={i.ingredient.name}
                            className="w-12 h-12 rounded-xl object-cover shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                        />
                    )}
                    <div className="flex flex-col">
                        <span className="text-slate-800 dark:text-white font-bold text-sm leading-tight">{i.ingredient?.name}</span>
                        <span className="text-slate-500 dark:text-white text-xs font-medium">{i.amount} {i.unit?.name}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);