import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { APP_ENV } from "../../env";
import { useSearchRecipesQuery } from "../../api/recipeService";
import PageContainer from "../../Components/layout/PageContainer";
import PageHeader from "../../Components/layout/PageHeader";
import Card from "../../Components/UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import AnimatedPage from "../../Components/layout/AnimatedPage";
import type { RootState } from "../../store";

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRequest, setSearchRequest] = useState<{ SearchTerm?: string; UserId?: number; IsPublished?: boolean }>({});
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [showAllPublic, setShowAllPublic] = useState(currentUser ? false : true);

  // Update search request
  useEffect(() => {
    setSearchRequest({
      SearchTerm: searchTerm || undefined,
      CurrentUser: !showAllPublic && !!currentUser,
      IsPublished: showAllPublic || !currentUser ? true : undefined,
    });
  }, [searchTerm, currentUser, showAllPublic]);

  const { data: recipes, isLoading, error } = useSearchRecipesQuery(searchRequest);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load recipes</p>;

  return (
    <AnimatedPage>
      <PageContainer>
        {/* Top row: header + create button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <PageHeader
            title={currentUser ? "My Recipes" : "Recipes"}
            subtitle="Browse and manage your recipes"
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

        {/* Second row: search + filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-300"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-2.5 text-slate-400" />
          </div>

          {currentUser && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showAllPublic}
                onChange={(e) => setShowAllPublic(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-amber-400 focus:ring-amber-300"
              />
              <span className="text-sm text-slate-700">Show all public recipes</span>
            </label>
          )}
        </div>

        {/* Empty state */}
        {recipes?.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-slate-500 mb-4">
              {currentUser ? "У вас поки що немає створених рецептів" : "No recipes found"}
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
          </Card>
        )}

        {/* Recipes grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes?.items?.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {recipe.image && (
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img
                      src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`}
                      alt={recipe.name}
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-slate-900">
                  {recipe.name}
                </h3>
                {recipe.category && <p className="text-slate-500 mt-1 text-sm">{recipe.category.name}</p>}
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    </AnimatedPage>
  );
}
