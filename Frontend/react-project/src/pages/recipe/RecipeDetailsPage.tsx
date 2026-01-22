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
import { RecipeIngredients } from "../../Components/recipe/RecipeIngredients.tsx";
import { RecipeInstruction } from "../../Components/recipe/RecipeInstruction.tsx";
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

  if (isRecipeLoading)
  return (
    <div className="text-center py-20 font-medium text-gray-500 dark:text-gray-400">
      Завантаження...
    </div>
  );
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
        <div className="mb-8">
          <button
              onClick={() => navigate(-1)}
              className="group text-gray-400 dark:text-gray-500 hover:text-yellow-500 transition-colors flex items-center gap-3 font-bold uppercase text-xs tracking-widest"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all">
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            Назад до списку
          </button>
        </div>

      <Card className="
        overflow-hidden p-0 relative
        bg-white dark:bg-gray-900
        border border-yellow-400/30
        shadow-gray-300/40
        shadow-xl dark:shadow-none
      ">
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
                        ${localRecipe?.isPublished
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                          : "bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-gray-400"}
                      `}
                    >
                      {localRecipe?.isPublished ? "Опубліковано 🌍" : "Чернетка 🔒"}
                    </motion.button>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {recipe.name}
                </h1>
                {recipe.category && (
                    <span className="
                    inline-block px-3 mt-2 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-300
                    bg-yellow-400 text-gray-950 shadow-sm shadow-yellow-400/20
                    dark:bg-yellow-400/10 dark:text-yellow-400 dark:border dark:border-yellow-400/20
                     ">
                    {recipe.category.name}
                  </span>

                )}
              </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <div className="
                    flex-1 lg:flex-none p-3 rounded-2xl
                    bg-slate-50 dark:bg-gray-800
                    border border-slate-100 dark:border-gray-700
                    flex items-center justify-between gap-4
                  ">
                    <span className="text-sm font-bold text-slate-500 ml-1">Порції:</span>
                    <PortionSelector
                      count={currentPortions}
                      onIncrease={() => handlePortionChange(1)}
                      onDecrease={() => handlePortionChange(-1)}
                    />
                  </div>


                {isOwner && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center justify-center min-w-[3.5rem] h-[3.5rem] rounded-2xl bg-red-50 dark:bg-red-500/10
                    text-red-500 dark:text-red-400
                    border-red-100 dark:border-red-500/20
                    hover:bg-red-500 hover:text-white
                    text-red-500 border border-red-100 dark:border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90 disabled:opacity-50 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </div>


            {recipe.image && (
                <div className="mb-12 group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 max-h-[400px] md:max-h-[550px]">
                  <img
                      src={`${APP_ENV.API_BASE_URL}/images/800_${recipe.image}`}
                      alt={recipe.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
            )}


            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              <div className="md:col-span-1">
                <RecipeIngredients ingredients={recipe.ingredients!} />
              </div>
              <div className="md:col-span-2">
                <RecipeInstruction
                    instruction={recipe.instruction}
                    recipeId={recipe.id}
                    onCopy={handleCopy}
                />
              </div>
            </div>
          </div>
        </Card>
      </PageContainer>
    </AnimatedPage>
  );
}
