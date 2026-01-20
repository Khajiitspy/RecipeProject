import { useParams, Link } from "react-router";
import { useGetRecipeByIdQuery, useDeleteRecipeMutation } from "../../api/recipeService";
import { APP_ENV } from "../../env";
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(Number(id));
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
  
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    await deleteRecipe(id);
    navigate("/recipes"); // back to list
  };

  if (isLoading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <PageContainer>
      <Card className="relative">
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          {recipe.name}
        </h1>

        {recipe.image && (
          <img
            src={`${APP_ENV.API_BASE_URL}/images/800_${recipe.image}`}
            alt={recipe.name}
            className="
              rounded-xl w-full mb-6
              transition-transform duration-300
              hover:scale-[1.01]
              shadow-md
            "
          />
        )}

        <h2 className="text-xl font-bold text-slate-800 mb-4">Інгрідієнти</h2>

        <ul className="space-y-3 mb-8">
          {recipe.ingredients?.map((i) => (
            <li
              key={i.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-slate-50"
            >
              {i.ingredient?.image && (
                <img
                  src={`${APP_ENV.API_BASE_URL}/images/100_${i.ingredient.image}`}
                  alt={i.ingredient.name}
                  className="w-10 h-10 rounded object-cover"
                />
              )}

              <span className="text-slate-700">
                <strong>{i.amount}</strong>{" "}
                {i.unit?.name}{" "}
                {i.ingredient?.name}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mb-3">Покроково</h2>

        <p
          className="
            text-slate-700
            whitespace-pre-line
            leading-relaxed
            bg-slate-50
            p-4
            rounded-xl
          "
        >
          {recipe.instruction}
        </p>
        <Link
          to={`/recipes/edit/${recipe.id}`}
          className="inline-flex items-center gap-2 mt-6
                     bg-amber-300 text-gray-900 px-5 py-3 rounded-xl font-bold
                     hover:bg-amber-400 transition"
        >
          ✏️ Оновити рецепт
        </Link>
        <button
          onClick={() => handleDelete(recipe.id)}
          disabled={isDeleting}
          title="Delete recipe"
          className="
            absolute bottom-4 right-4
            p-3 rounded-full
            bg-white/90 text-red-600
            shadow-md border
            hover:bg-red-50 hover:text-red-700
            transition
            disabled:opacity-50
          "
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </Card>
    </PageContainer>
  );
}
