import Card from "../UI/Card.tsx";
import {Link} from "react-router";
import {APP_ENV} from "../../env";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUtensils} from "@fortawesome/free-solid-svg-icons";
import type {ICartRecipe} from "../../types/cart/ICartData.ts";

interface CartRecipeCardProps {
    recipe: ICartRecipe
}

const CartRecipeCard = ({recipe}: CartRecipeCardProps) => {
    return (
        <Link to={`/recipes/${recipe.recipeId}`}>
            <Card className="hover:shadow-lg transition-all duration-300 group">
                {/* Зображення з IRecipeItem */}
                {recipe.recipeImage ? (
                    <img
                        src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.recipeImage}`}
                        alt={recipe.recipeName}
                        className="rounded-xl w-full h-44 object-cover mb-4 group-hover:scale-[1.02] transition-transform"
                    />
                ) : (
                    <div className="h-44 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-300">
                        <FontAwesomeIcon icon={faUtensils} size="3x"/>
                    </div>
                )}

                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-800 leading-tight">
                            {recipe.recipeName}
                        </h3>
                    </div>
                    <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                        {recipe.portion} {recipe.portion === 1 ? "порція" : "порції"}
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default CartRecipeCard;