import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCopy } from "@fortawesome/free-solid-svg-icons";

interface InstructionProps {
    instruction: string;
    recipeId: number;
    onCopy: () => void;
}

export const RecipeInstruction = ({ instruction, recipeId, onCopy }: InstructionProps) => (
    <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-400 rounded-full"></span>
                Приготування
            </h2>
            <button
                onClick={onCopy}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors cursor-pointer border border-slate-200"
                title="Копіювати текст"
            >
                <FontAwesomeIcon icon={faCopy} size="sm" />
            </button>
        </div>

        <div className="bg-slate-50/30 p-6 md:p-8 rounded-3xl border border-slate-100">
            <p className="text-slate-700 whitespace-pre-line leading-relaxed text-lg">
                {instruction}
            </p>
        </div>

        <div className="flex gap-4 mt-8">
            <Link
                to={`/recipes/edit/${recipeId}`}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            >
                <FontAwesomeIcon icon={faPen} className="text-xs" />
                Редагувати
            </Link>
        </div>
    </div>
);