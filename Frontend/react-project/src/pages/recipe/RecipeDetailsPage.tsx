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
            className="rounded-xl w-full mb-6"
          />
        )}

        <h2 className="text-xl font-bold text-slate-800 mb-2">Ingredients</h2>
        <ul className="space-y-1 mb-6">
          {recipe.ingredients?.map((i) => (
            <li key={i.id} className="text-slate-700">
              • {i.amount} {i.unit?.name} {i.ingredient?.name}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mb-2">Instructions</h2>
        <p className="text-slate-700 whitespace-pre-line">
          {recipe.instruction}
        </p>
        <Link
          to={`/recipes/edit/${recipe.id}`}
          className="inline-flex items-center gap-2 mt-6
                     bg-amber-300 text-gray-900 px-5 py-3 rounded-xl font-bold
                     hover:bg-amber-400 transition"
        >
          ✏️ Edit recipe
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
