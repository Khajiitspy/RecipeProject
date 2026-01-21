import { useState } from "react";
import PageContainer from "../../Components/layout/PageContainer";
import PageHeader from "../../Components/layout/PageHeader";
import { useGetCartQuery } from "../../api/cartService.ts";
import CartTabs from "../../Components/cart/CartTabs.tsx";
import CartRecipeGrid from "../../Components/cart/CartRecipeGrid.tsx";
import CartShoppingList from "../../Components/cart/CartShoppingList.tsx";
import LoadingOverlay from "../../Components/UI/loading/LoadingOverlay.tsx";

export default function CartPage() {
    const [activeTab, setActiveTab] = useState<"recipes" | "shopping-list">("recipes");
    const { data, isLoading, error } = useGetCartQuery();

    if (isLoading) return <LoadingOverlay />;

    if (error) return (
        <PageContainer>
            <div className="text-center text-red-500 py-10 font-semibold">
                Помилка завантаження даних. Будь ласка, спробуйте пізніше.
            </div>
        </PageContainer>
    );

    if (!data || (data.recipes.length === 0 && data.ingredients.length === 0)) {
        return (
            <PageContainer>
                <PageHeader title="Мій план харчування" />
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mt-8">
                    <p className="text-slate-500 text-lg">Ваш кошик поки що порожній.</p>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <div className="mb-8">
                <PageHeader
                    title="Мій план харчування"
                    subtitle="Керуйте рецептами та списком покупок"
                />
            </div>

            <CartTabs active={activeTab} onChange={setActiveTab} />

            {activeTab === "recipes" ? (
                <CartRecipeGrid recipes={data.recipes} />
            ) : (
                <CartShoppingList ingredients={data.ingredients} />
            )}
        </PageContainer>
    );
}