import { useParams, useNavigate } from "react-router";
import { useGetRecipeByIdQuery, useDeleteRecipeMutation } from "../../api/recipeService";
import { useGetCartQuery, useAddRecipeToCartMutation } from "../../api/cartService";
import { APP_ENV } from "../../env";
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { PortionSelector } from "../../Components/cart/PortionSelector.tsx";
import {RecipeIngredients} from "../../Components/Recipe/RecipeIngredients.tsx";
import {RecipeInstruction} from "../../Components/Recipe/RecipeInstruction.tsx";

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: recipe, isLoading: isRecipeLoading } = useGetRecipeByIdQuery(Number(id));
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
  const { data: cartData } = useGetCartQuery();
  const [addRecipeToCart] = useAddRecipeToCartMutation();

  const cartItem = cartData?.recipes?.find((r) => r.recipeId === Number(id));
  const currentPortions = cartItem ? cartItem.portion : 0;

  const handlePortionChange = async (diff: number) => {
    try {
      await addRecipeToCart({ recipeId: Number(id), portion: diff }).unwrap();
    } catch (err) {
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

  if (isRecipeLoading) return <div className="text-center py-20 font-medium text-slate-500">Завантаження...</div>;
  if (!recipe) return <div className="text-center py-20 text-red-500">Рецепт не знайдено</div>;

  return (
      <PageContainer>

        <div className="mb-8">
          <button
              onClick={() => navigate(-1)}
              className="group text-gray-400 hover:text-yellow-500 transition-colors flex items-center gap-3 font-bold uppercase text-xs tracking-widest cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all">
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            Назад до списку
          </button>
        </div>

        <Card className="overflow-hidden p-0 border-none bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none transition-colors duration-300">
          <div className="p-8 md:p-12">
            {/* ЗАГОЛОВОК ТА ПОРЦІЇ */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">
                  {recipe.name}
                </h1>
                {recipe.category && (
                    <span className="inline-block bg-yellow-400 text-gray-950 px-5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
                    {recipe.category.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="flex-1 lg:flex-none bg-gray-50 dark:bg-gray-800/50 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-6">
                  <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">Порції</span>
                  <PortionSelector
                      count={currentPortions}
                      onIncrease={() => handlePortionChange(1)}
                      onDecrease={() => handlePortionChange(-1)}
                  />
                </div>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center justify-center min-w-[3.5rem] h-[3.5rem] rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-100 dark:border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90 disabled:opacity-50 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
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

            {/* КОНТЕНТ: Інгредієнти та Інструкції */}
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
  );
}