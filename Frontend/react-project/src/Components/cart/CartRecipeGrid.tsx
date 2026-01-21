import type {ICartRecipe} from "../../types/cart/ICartData.ts";
import CartRecipeCard from "./CartRecipeCard.tsx";

const CartRecipeGrid = ({ recipes }: { recipes: ICartRecipe[] }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((item) => (
                <CartRecipeCard
                    key={item.recipeId}
                    recipe={item}
                />
            ))}
        </div>
    );
};

export default CartRecipeGrid;