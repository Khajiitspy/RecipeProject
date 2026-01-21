import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUtensils} from "@fortawesome/free-solid-svg-icons";

interface TabsProps {
    active: "recipes" | "shopping-list";
    onChange: (tab: "recipes" | "shopping-list") => void;
}

const CartTabs = ({ active, onChange }: TabsProps) => (
    <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-md mx-auto mb-8">
        {(["recipes", "shopping-list"] as const).map((tab) => (
            <button
                key={tab}
                onClick={() => onChange(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all duration-200
          ${active === tab ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
                <FontAwesomeIcon icon={tab === "recipes" ? faUtensils : faShoppingCart} />
                {tab === "recipes" ? "Обрані рецепти" : "Список продуктів"}
            </button>
        ))}
    </div>
);

export default CartTabs;