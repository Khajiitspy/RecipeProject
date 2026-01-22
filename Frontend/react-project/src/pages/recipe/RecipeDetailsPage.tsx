import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useGetRecipeByIdQuery, useDeleteRecipeMutation, useTogglePublishMutation } from "../../api/recipeService";
import { useGetCartQuery, useAddRecipeToCartMutation } from "../../api/cartService";
import { APP_ENV } from "../../env";
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { PortionSelector } from "../../Components/cart/PortionSelector.tsx";
import { RecipeIngredients } from "../../Components/Recipe/RecipeIngredients.tsx";
import { RecipeInstruction } from "../../Components/Recipe/RecipeInstruction.tsx";
import AnimatedPage from "../../Components/layout/AnimatedPage";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading: isRecipeLoading, refetch } = useGetRecipeByIdQuery(Number(id));
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
  const [togglePublish] = useTogglePublishMutation();
  const { data: cartData } = useGetCartQuery();
  const [addRecipeToCart] = useAddRecipeToCartMutation();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // Local UI state
  const [localRecipe, setLocalRecipe] = useState(recipe);
  const [ingredientsOpen, setIngredientsOpen] = useState(true);

  // Sync local recipe with query data
  useEffect(() => {
    setLocalRecipe(recipe);
  }, [recipe]);

  if (isRecipeLoading) return <div className="text-center py-20 font-medium text-slate-500">Завантаження...</div>;
  if (!recipe) return <div className="text-center py-20 text-red-500">Рецепт не знайдено</div>;

  const isOwner = Boolean(currentUser && recipe.userId && recipe.userId === currentUser.id);

  const cartItem = (cartData?.recipes || []).find((r) => r.recipeId === Number(id));

  const currentPortions = cartItem ? cartItem.portion : 0;

  const handlePortionChange = async (diff: number) => {
    try {
      await addRecipeToCart({ recipeId: Number(id), portion: diff }).unwrap();
    } catch {
      message.error("Не вдалося оновити кошик");
    }
  };

  const handleCopy = () => {
    if (recipe?.instruction) {
      navigator.clipboard.writeText(recipe.instruction);
      message.success("Інструкцію скопійовано!");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Ви впевнені, що хочете видалити цей рецепт?")) return;
    try {
      await deleteRecipe(Number(id)).unwrap();
      message.success("Рецепт видалено");
      navigate("/recipes");
    } catch {
      message.error("Помилка при видаленні");
    }
  };

  return (
    <AnimatedPage>
      <PageContainer>
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-slate-800 transition flex items-center gap-2 font-medium cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Назад до списку
          </button>
        </div>

        <Card className="overflow-hidden p-0 relative">
          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  {isOwner && (
                    <motion.button
                      layout
                      onClick={async () => {
                        setLocalRecipe(prev => prev ? { ...prev, isPublished: !prev.isPublished } : prev);
                        await togglePublish(recipe.id);
                        refetch();
                      }}
                      className={`
                        px-3 py-1 rounded-full text-sm font-bold
                        ${localRecipe?.isPublished ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}
                      `}
                    >
                      {localRecipe?.isPublished ? "Опубліковано 🌍" : "Чернетка 🔒"}
                    </motion.button>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                  {recipe.name}
                </h1>
                {recipe.category && (
                  <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold border border-indigo-100">
                    {recipe.category.name}
                  </span>
                )}
              </div>

              {isOwner && (
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  {/* Portion selector */}
                  <div className="flex-1 lg:flex-none bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-slate-500 ml-1">Порції:</span>
                    <PortionSelector
                      count={currentPortions}
                      onIncrease={() => handlePortionChange(1)}
                      onDecrease={() => handlePortionChange(-1)}
                    />
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center justify-center min-w-[3rem] h-12 rounded-2xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            {/* Recipe image */}
            {recipe.image && (
              <div className="mb-10 group overflow-hidden rounded-3xl shadow-md border border-slate-100 max-h-[300px] md:max-h-[450px]">
                <img
                  src={`${APP_ENV.API_BASE_URL}/images/800_${recipe.image}`}
                  alt={recipe.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            )}

            {/* Ingredients with toggle */}
            <button
              onClick={() => setIngredientsOpen(!ingredientsOpen)}
              className="flex items-center justify-between w-full mb-4"
            >
              <h2 className="text-xl font-bold text-slate-800">Інгрідієнти</h2>
              <span className="text-slate-500 text-sm">{ingredientsOpen ? "Hide ▲" : "Show ▼"}</span>
            </button>

            <motion.div
              initial={false}
              animate={{ height: ingredientsOpen ? "auto" : 0, opacity: ingredientsOpen ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-10"
            >
              <RecipeIngredients ingredients={recipe.ingredients!} />
            </motion.div>

            {/* Instructions */}
            <RecipeInstruction instruction={recipe.instruction} recipeId={recipe.id} onCopy={handleCopy} />
          </div>
        </Card>
      </PageContainer>
    </AnimatedPage>
  );
}
