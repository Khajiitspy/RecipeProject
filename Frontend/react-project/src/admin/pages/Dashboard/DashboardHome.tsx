import PageMeta from "../../../Components/common/PageMeta.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBowlFood, faUsers, faUserShield, faUtensils} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import {useGetUsersQuery} from "../../../api/adminService.ts";
import {useGetAllRecipesQuery} from "../../../api/recipeService.ts";


export default function DashboardHome() {

    const { data: users, isLoading, error } = useGetUsersQuery();
    const { data: recipes } = useGetAllRecipesQuery();


    const stats = [
        {
            label: "Користувачів",
            value: users ? users.length.toString() : "...",
            icon: faUsers,
            color: "bg-blue-500"
        },
        {
            label: "Всього загальнодостуних рецептів",
            value: recipes ? recipes.length.toString() : "...",
            icon: faBowlFood,
            color: "bg-yellow-400"
        }
    ];

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
    );

    if (error) return (
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-[2rem] border border-red-100 dark:border-red-800">
            <p className="text-red-500 font-bold text-lg">Помилка завантаження даних</p>
        </div>
    );

    return (
        <>
        <PageMeta
            title="EatLog Admin | Dashboard"
            description="Панель управління кулінарним проєктом EatLog"
        />

    <div className="space-y-10">
        <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden">
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
                    Привіт, <span className="text-yellow-400">Адмін!</span> 👋
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl font-medium leading-relaxed">
                    Сьогодні чудовий день, щоб перевірити нові рецепти та навести лад у базі користувачів. Твоя кухня — твої правила!
                </p>
            </div>
            {/* Декоративний елемент фону */}
            <FontAwesomeIcon
                icon={faUtensils}
                className="absolute -right-10 -bottom-10 text-[15rem] text-gray-50 dark:text-gray-800/20 -rotate-12 pointer-events-none"
            />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
                    <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg shadow-yellow-400/10`}>
                        <FontAwesomeIcon icon={stat.icon} size="lg" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                            {stat.value}
                        </h3>
                    </div>
                </div>
            ))}
        </div>




        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Швидкі інструменти</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Link to="/admin/users" className="group p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-transparent hover:border-yellow-400 transition-all text-center">
                        <FontAwesomeIcon icon={faUserShield} className="text-2xl text-gray-400 group-hover:text-yellow-400 mb-3 transition-colors" />
                        <span className="block text-[11px] font-black uppercase tracking-widest dark:text-gray-300">Керувати користувачами</span>
                    </Link>

                    <Link
                        to="/admin/recipes"
                        className="relative group p-6 bg-gray-50 dark:bg-gray-900/40 rounded-[2rem] border border-transparent hover:border-yellow-400 transition-all text-center overflow-hidden"
                    >

                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/20 animate-pulse">
                            <div className="w-1 h-1 bg-gray-950 rounded-full"></div>
                            <span className="text-[8px] font-black uppercase tracking-tighter text-gray-950">
                                WIP
                            </span>
                        </div>

                        <div className="mt-2">
                            <FontAwesomeIcon
                                icon={faUtensils}
                                className="text-2xl text-gray-400 group-hover:text-yellow-400 mb-3 transition-colors"
                            />
                            <span className="block text-[11px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                Модерація контенту
                            </span>
                        </div>

                        <div className="absolute inset-0 bg-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </Link>


                </div>
            </div>


            <div className="lg:col-span-4 bg-yellow-400 p-8 rounded-[2.5rem] shadow-xl shadow-yellow-400/20 flex flex-col justify-between">
                <div>
                    <h3 className="text-gray-900 font-black uppercase text-[11px] tracking-widest mb-4">Статус розробки</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-gray-900 text-sm font-bold">
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                            Backend (Asp.Net) — Online
                        </li>
                        <li className="flex items-center gap-2 text-gray-900 text-sm font-bold">
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                            Frontend (React) — Active
                        </li>
                        <li className="flex items-center gap-2 text-gray-900 text-sm font-bold opacity-50">
                            <div className="w-2 h-2 bg-gray-600 rounded-full" />
                            Mobile App — Planned
                        </li>
                    </ul>
                </div>
                <div className="mt-8">
                    <p className="text-[10px] font-black uppercase text-gray-900/50 tracking-tighter">EatLog v1.0.1-beta</p>
                </div>
            </div>
        </div>
    </div>
    </>
);
}