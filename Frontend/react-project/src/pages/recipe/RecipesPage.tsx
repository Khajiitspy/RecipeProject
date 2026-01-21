import { useGetRecipesQuery } from "../../api/recipeService";
import { useAddRecipeToCartMutation, useGetCartQuery } from "../../api/cartService";
import { Link } from "react-router";
import PageContainer from "../../Components/layout/PageContainer";
import PageHeader from "../../Components/layout/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import {RecipeCard} from "../../Components/Recipe/RecipeCard.tsx";

export default function RecipesPage() {
    const { data: recipes, isLoading: recipesLoading, error: recipesError } = useGetRecipesQuery();
    const { data: cartData } = useGetCartQuery();
    const [addRecipeToCart] = useAddRecipeToCartMutation();

    const handlePortionChange = async (recipeId: number, portion: number) => {
        try {
            await addRecipeToCart({ recipeId, portion }).unwrap();
        } catch (err) {
            message.error("Не вдалося оновити кошик");
        }
    };

    if (recipesLoading) return <div className="p-10 text-center">Loading...</div>;
    if (recipesError) return <div className="p-10 text-center text-red-500">Failed to load recipes</div>;

    return (
        <PageContainer>
            <div className="flex justify-between items-center mb-8">
                <PageHeader title="My Recipes" subtitle="Create, edit and manage your recipes" />
                <Link
                    to="/recipes/create"
                    className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition shadow"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Створити рецепт
                </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recipes?.map((recipe) => {
                    const cartItem = cartData?.recipes.find((r) => r.recipeId === recipe.id);

                    return (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            portions={cartItem?.portion ?? 0}
                            onPortionChange={handlePortionChange}
                        />
                    );
                })}
            </div>
        </PageContainer>
    );
}