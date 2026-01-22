import {Link, useNavigate} from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faComments,
    faAngleLeft,
    faAngleRight,
    faCartShopping,
    faPlus, faGear, faRightToBracket, faUserPlus, faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useAppSelector} from "../../store";



interface SideBarProps {
    isMobileOpen: boolean;
    closeMobileMenu: () => void;
}


const MainSideBar = ({ isMobileOpen,closeMobileMenu }: SideBarProps) => {
    const { user } = useAppSelector(state=>state.auth);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);


    const handleLoginRedirect = () => {
        closeMobileMenu();
        navigate('/account/login');
    };

    const handleSignUpRedirect = () => {
        closeMobileMenu();
        navigate('/account/register');
    };

    return (
        <aside
            className={`h-screen flex flex-col transition-all duration-300 z-50
            bg-white dark:bg-gray-950 
            text-gray-600 dark:text-gray-300 
            border-r border-gray-200 dark:border-gray-800 
            overflow-y-auto px-4 py-6
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative fixed inset-y-0 left-0
            md:translate-x-0
            ${collapsed ? "md:w-20" : "w-72"}`}
        >

            <div className="flex items-center justify-between mb-8 px-2">
                {(!collapsed || isMobileOpen) && (
                    <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white transition-all hover:scale-105 active:scale-95"
                    >
                        Eat<span className="text-yellow-400">Log</span>
                    </Link>
                )}

                <button
                    onClick={toggleSidebar}
                    className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
                </button>
            </div>


            {!user && (
                <div className="md:hidden flex flex-col mb-6 gap-3 px-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Авторизація</p>
                    <button
                        onClick={handleLoginRedirect}
                        className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-yellow-400 text-gray-900 font-bold shadow-md shadow-yellow-400/20 active:scale-95 transition-all"
                    >
                        <FontAwesomeIcon icon={faRightToBracket} />
                        <span>Увійти</span>
                    </button>
                    <button
                        onClick={handleSignUpRedirect}
                        className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 font-bold hover:bg-yellow-50 dark:hover:bg-yellow-400/10 hover:text-yellow-600 transition-all active:scale-95"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>Реєстрація</span>
                    </button>
                </div>
            )}

            {/* РОЗДІЛЬНИК */}
            <div className="h-px bg-gray-100 dark:bg-gray-800 mb-6 mx-2"></div>

            {/* НАВІГАЦІЯ */}
            <nav className="flex-1 space-y-1">
                {[
                    { to: "/", icon: faHouse, label: "Головна" },
                    { to: "/recipes?public=true", icon: faFire, label: "Всі рецепти" },
                    { to: "/answers", icon: faComments, label: "Запитання", beta: true },
                ].map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        onClick={closeMobileMenu}
                        className={`flex items-center gap-4 py-3 px-3 rounded-xl transition-all group
        ${location.pathname === link.to
                            ? "bg-yellow-50 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"}`}
                    >
                        <FontAwesomeIcon
                            icon={link.icon}
                            className={`w-5 h-5 transition-colors ${location.pathname === link.to ? "text-yellow-500" : "group-hover:text-yellow-500"}`}
                        />
                        {(!collapsed || isMobileOpen) && (
                            <span className="text-sm font-bold">
                        {link.label}
                                {link.beta && (
                                    <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-yellow-400 text-gray-900 rounded font-black uppercase tracking-tighter">
                                Beta
                            </span>
                                )}
                    </span>
                        )}
                    </Link>
                ))}

                {user && (
                    <>
                    <Link
                        to="/recipes/create"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 py-3 px-3 rounded-xl transition-all hover:bg-yellow-400 hover:text-gray-900 group mt-4 bg-gray-50 dark:bg-gray-900"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-5 h-5 text-yellow-500 group-hover:text-gray-900" />
                        {(!collapsed || isMobileOpen) && <span className="text-sm font-bold">Додати рецепт</span>}
                    </Link>


                    <Link
                        to="/recipes/"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 py-3 px-3 rounded-xl transition-all hover:bg-yellow-400 hover:text-gray-900 group mt-4 bg-gray-50 dark:bg-gray-900"
                    >
                        <FontAwesomeIcon icon={faBowlFood} className="w-5 h-5 text-yellow-500 group-hover:text-gray-900" />
                        {(!collapsed || isMobileOpen) && <span className="text-sm font-bold">Мої рецепти</span>}
                    </Link>

                    <Link
                        to="/cart"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 py-3 px-3 rounded-xl transition-all hover:bg-yellow-400 hover:text-gray-900 group mt-4 bg-gray-50 dark:bg-gray-900"
                    >
                        <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5 text-yellow-500 group-hover:text-gray-900" />
                        {(!collapsed || isMobileOpen) && <span className="text-sm font-bold">Кошик</span>}
                    </Link>

                    </>

                )}
            </nav>

            {/* ФУТЕР САЙДБАРА */}
            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                <Link
                    to="/settings"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                    <FontAwesomeIcon icon={faGear} className="w-5 h-5 group-hover:text-yellow-500" />
                    {(!collapsed || isMobileOpen) && <span className="text-sm font-bold">Налаштування</span>}
                </Link>
            </div>
        </aside>
    );
};

export default MainSideBar;
