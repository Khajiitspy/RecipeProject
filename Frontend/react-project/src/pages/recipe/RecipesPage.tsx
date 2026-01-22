import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { useSearchRecipesQuery } from "../../api/recipeService";
import { useGetCartQuery, useAddRecipeToCartMutation } from "../../api/cartService";
import AnimatedPage from "../../Components/layout/AnimatedPage";
import PageContainer from "../../Components/layout/PageContainer";
import PageHeader from "../../Components/layout/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { RecipeCard } from "../../Components/Recipe/RecipeCard.tsx";
import type { RootState } from "../../store";
import { APP_ENV } from "../../env";

export default function RecipesPage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // Search & URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("q") || "";
  const initialShowAllPublic = searchParams.get("public") === "true";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [showAllPublic, setShowAllPublic] = useState(initialShowAllPublic);

  const [searchRequest, setSearchRequest] = useState<{
    SearchTerm?: string;
    IsPublished?: boolean;
    UserId?: number;
  }>({});

  // Update searchRequest whenever relevant state changes
  useEffect(() => {
    const req: { SearchTerm?: string; IsPublished?: boolean; UserId?: number } = {};

    if (searchTerm) req.SearchTerm = searchTerm;

    if (!currentUser) {
      // guest sees only published
      req.IsPublished = true;
    } else {
      if (showAllPublic) {
        req.IsPublished = false; // browsing public
      } else {
        req.UserId = currentUser.id; // my recipes
      }
    }

    setSearchRequest(req);
  }, [searchTerm, currentUser, showAllPublic]);

  // Sync input/checkbox with URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchTerm) params.q = searchTerm;
    if (currentUser && showAllPublic) params.public = "true";
    else params.public = "false";

    setSearchParams(params);
  }, [searchTerm, showAllPublic, currentUser, setSearchParams]);

  // Fetch recipes and cart
  const { data: recipes, isLoading, error } = useSearchRecipesQuery(searchRequest);
  const { data: cartData } = useGetCartQuery();
  const [addRecipeToCart] = useAddRecipeToCartMutation();

  const handlePortionChange = async (recipeId: number, portion: number) => {
    try {
      await addRecipeToCart({ recipeId, portion }).unwrap();
    } catch (err) {
      message.error("Не вдалося оновити кошик");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <AnimatedPage>
      <PageContainer>
        {/* Header + create recipe */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <PageHeader
            title={
              currentUser
                ? showAllPublic
                  ? "Публічні рецепти"
                  : "Мої рецепти"
                : "Всі рецепти"
            }
            subtitle="Переглядайте та керуйте своїми рецептами"
          />

          {currentUser && (
            <Link
              to="/recipes/create"
              className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-xl font-semibold hover:bg-slate-800 transition shadow"
            >
              <FontAwesomeIcon icon={faPlus} />
              Створити рецепт
            </Link>
          )}
        </div>

        {/* Search + toggle */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mb-6 items-center">
          <div className="relative flex-1 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Пошук рецептів..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-300"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-3 top-2.5 text-slate-400"
            />
          </div>

          {currentUser && (
            <label className="flex items-center gap-2 mt-2 sm:mt-0">
              <input
                type="checkbox"
                checked={showAllPublic}
                onChange={(e) => setShowAllPublic(e.target.checked)}
              />
              Показати всі публічні рецепти
            </label>
          )}
        </div>

        {/* Loading / error */}
        {isLoading && <p className="text-center py-10">Loading...</p>}
        {error && <p className="text-center py-10 text-red-500">Failed to load recipes</p>}

        {/* Empty state */}
        {recipes?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">
              {currentUser
                ? "У вас поки що немає створених рецептів"
                : "No recipes found"}
            </p>
            {currentUser && (
              <Link
                to="/recipes/create"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl"
              >
                <FontAwesomeIcon icon={faPlus} />
                Створіть свій перший рецепт
              </Link>
            )}
          </div>
        )}

        {/* Recipe grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes?.items?.map((recipe) => {
            const cartItem = (cartData?.recipes ?? []).find((r) => r.recipeId === recipe.id);

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
    </AnimatedPage>
  );
}
