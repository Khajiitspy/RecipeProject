import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface PortionSelectorProps {
    count: number;
    onIncrease: (e: React.MouseEvent) => void;
    onDecrease: (e: React.MouseEvent) => void;
}

export const PortionSelector = ({ count, onIncrease, onDecrease }: PortionSelectorProps) => {
    return (
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-slate-200">
            <button
                onClick={onDecrease}
                disabled={count === 0}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition
                ${count > 0
                    ? "bg-white text-slate-700 hover:bg-red-100 hover:text-red-600 shadow-sm"
                    : "text-slate-300 cursor-not-allowed"
                }`}
            >
                <FontAwesomeIcon icon={faMinus} size="sm" />
            </button>

            <span className="w-8 text-center font-bold text-slate-800">
                {count}
            </span>

            <button
                onClick={onIncrease}
                className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white rounded-lg hover:bg-slate-700 transition shadow-sm"
            >
                <FontAwesomeIcon icon={faPlus} size="sm" />
            </button>
        </div>
    );
};