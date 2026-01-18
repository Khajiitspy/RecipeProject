import {Link, useNavigate} from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faComments,
    faAngleLeft,
    faAngleRight,
    faPlus, faGear, faRightToBracket, faUserPlus,
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
            className={`h-screen  bg-amber-300  text-gray-800  flex flex-col border-r  border-gray-200 dark:border-gray-800 overflow-y-auto px-3 py-4 transition-all duration-300
             ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
             md:relative fixed inset-y-0 left-0 z-50
             md:translate-x-0
             ${collapsed ? "md:w-16" : "w-64"}`}
        >

            <div className="flex items-center justify-between mb-4 px-2">
                {/* Показуємо назву на мобільці АБО на десктопі, якщо не collapsed */}
                {(!collapsed || isMobileOpen) && (
                    <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="text-2xl font-semibold text-gray-800 ml-1   hover:bg-gray-400/20 rounded-md transition"
                    >
                        EatLog
                    </Link>
                )}

                {/* Кнопка згортання (Тільки для ПК) */}
                <button
                    onClick={toggleSidebar}
                    className="hidden md:block text-gray-800 hover:text-gray-400  transition"
                >
                    <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
                </button>
            </div>




            {!user && (
                <div className="md:hidden flex flex-col mb-4 gap-3 px-2 pt-4 ">

                    <p className="text-Xl ml-1 font-bold text-gray-800 uppercase ">Авторизація</p>
                    <button
                        onClick={handleLoginRedirect}
                        className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gray-800 text-white font-bold shadow-md active:scale-95 transition-all"
                    >
                        <FontAwesomeIcon icon={faRightToBracket} />
                        <span>Увійти</span>
                    </button>

                    <button
                        onClick={handleSignUpRedirect}
                        className="flex items-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-800 text-gray-800 font-bold active:scale-95 transition-all"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>Реєстрація</span>
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-800 mt-4"></div>
                </div>
            )}


            <nav className="space-y-2 mb-6">

                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400  transition"
                >
                    <FontAwesomeIcon icon={faHouse} className="w-4 h-4 text-gray-800 " />
                    {!collapsed && <span className="text-sm font-medium">Home</span>}
                </Link>

                <Link
                    to="/popular"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400 transition"
                >
                    <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-gray-800 " />
                    {!collapsed && <span className="text-sm font-medium">Popular Resipes</span>}
                </Link>

                <Link
                    to="/answers"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400 transition"
                >
                    <FontAwesomeIcon icon={faComments} className="w-4 h-4 text-gray-800 " />
                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Answers <span className="text-orange-500 dark:text-orange-400 text-xs ml-1">BETA</span>
                        </span>
                    )}
                </Link>

                {user && (
                    <Link
                        to="/recipes/create"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400 dark:hover:bg-gray-80 transition"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-gray-800" />
                        {!collapsed && <span className="text-sm font-medium">Add Recipe</span>}
                    </Link>
                )}

            </nav>


            <div className="border-t border-gray-200 dark:border-gray-800 mb-4"></div>

            <div className="mt-auto pt-4 border-t border-gray-400/30 space-y-2">
                {/* Кнопка налаштувань */}
                <Link to="/settings" onClick={closeMobileMenu} className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400/20 transition">
                    <FontAwesomeIcon icon={faGear} className="w-4 h-4 text-gray-800" />
                    {!collapsed && <span className="text-sm font-medium text-gray-800">Settings</span>}
                </Link>
            </div>

        </aside>
    );
};

export default MainSideBar;
