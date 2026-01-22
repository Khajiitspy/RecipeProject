import { useDispatch, useSelector } from "react-redux";
import type {ICartIngredient} from "../../types/cart/ICartData.ts";
import type {RootState} from "../../store";
import {toggleIngredient} from "../../store/shoppingSlice.ts";

const CartShoppingList = ({ ingredients }: { ingredients: ICartIngredient[] }) => {
    const dispatch = useDispatch();

    const checkedIds = useSelector((state: RootState) => state.shopping.checkedIds);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
            <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                    Інгредієнти <span className="text-yellow-400 text-lg">/ Кошик</span>
                </h2>
                <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                    Згруповано на основі обраних рецептів
                </p>
            </div>


            <div className="divide-y divide-gray-50 dark:divide-gray-800">
                {ingredients.map((ing) => {
                    const isChecked = checkedIds.includes(ing.ingredientId);

                    return (
                        <label
                            key={ing.ingredientId}
                            className="p-5 flex justify-between items-center hover:bg-yellow-50/50 dark:hover:bg-yellow-400/5 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-5">
                                {/* КАСТОМНИЙ ЧЕКБОКС */}
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => dispatch(toggleIngredient(ing.ingredientId))}
                                        className="peer sr-only"
                                    />
                                    <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center
                                ${isChecked
                                        ? "bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/30"
                                        : "border-gray-200 dark:border-gray-700 bg-transparent group-hover:border-yellow-400"
                                    }`}
                                    >
                                        {isChecked && (
                                            <svg className="w-4 h-4 text-gray-900 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* НАЗВА ІНГРЕДІЄНТА */}
                                <span className={`text-base font-bold transition-all duration-300 ${
                                    isChecked
                                        ? "text-gray-300 dark:text-gray-600 line-through decoration-yellow-400/50 decoration-2"
                                        : "text-gray-700 dark:text-gray-200"
                                }`}>
                            {ing.ingredientName}
                        </span>
                            </div>


                            <div className="flex flex-col items-end gap-1">
                                {ing.units.map((unit) => (
                                    <div
                                        key={unit.unitId}
                                        className={`px-3 py-1 rounded-xl text-xs font-black transition-all duration-300 border
                                ${isChecked
                                            ? "bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-700 border-transparent"
                                            : "bg-yellow-400/10 dark:bg-yellow-400/5 text-yellow-600 dark:text-yellow-400 border-yellow-400/20"
                                        }`}
                                    >
                                        {unit.amount} <span className="opacity-60">{unit.unitName}</span>
                                    </div>
                                ))}
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default CartShoppingList;