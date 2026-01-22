import {Link, useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {logout} from "../../store/authSlice.ts";
import {faBars, faCrown, faLock, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {APP_ENV} from "../../env";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ThemeToggleButton} from "../../Components/common/ThemeToggleButton.tsx";


interface HeaderProps {
    toggleMobileMenu: () => void;
}


export const MainHeader = ({ toggleMobileMenu }: HeaderProps) => {
    const { user } = useAppSelector(state=>state.auth);


    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    function logoutUser() {
        dispatch(logout());
        navigate('/');
    }

    function openProfile(){
        navigate("/account/profile");
    }

    const handleLoginRedirect = () => {
        navigate('/account/login');
    };

    const handleSignUpRedirect = () => {
        navigate('/account/register');
    };



    return (
        <header className="sticky top-0 z-40 w-full py-3 px-6
        bg-white dark:bg-gray-950
        border-b border-gray-200 dark:border-gray-800
        shadow-sm transition-colors duration-300
        flex justify-between items-center">

            <div className="z-10">
                <button
                    onClick={toggleMobileMenu}
                    className="text-gray-600 dark:text-gray-300 text-2xl md:hidden focus:outline-none hover:text-yellow-500 transition-colors"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            {/* Логотип для мобільних пристроїв */}
            <div className="absolute left-1/2 -translate-x-1/2 flex lg:hidden items-center pointer-events-none">
                <Link
                    to="/"
                    className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white pointer-events-auto"
                >
                    Eat<span className="text-yellow-400">Log</span>
                </Link>
            </div>

            <nav className="flex items-center gap-4 ml-auto">

                <ThemeToggleButton className="text-yellow-400 hover:scale-110 transition-transform" />

                {user ? (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="flex items-center gap-3 focus:outline-none group">
                                <div className="relative">
                                    <img
                                        src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                        alt="Avatar"
                                        className={`w-10 h-10 rounded-full border-2 object-cover p-0.5 transition-colors ${
                                            user.roles.includes("Admin") ? "border-yellow-400" : "border-gray-200 dark:border-gray-700"
                                        }`}
                                    />
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-gray-950 rounded-full ${
                                        user.roles.includes("Admin") ? "bg-yellow-400" : "bg-green-500"
                                    }`}></span>
                                </div>

                                <div className="hidden md:flex flex-col items-start leading-tight text-left">
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 group-hover:text-yellow-500 transition-colors flex items-center gap-1">
                                {user?.name}
                                {user.roles.includes("Admin") && <FontAwesomeIcon icon={faCrown} className="text-yellow-400 text-[12px]" />}
                            </span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                {user.roles.includes("Admin") ? "Адміністратор" : "Користувач"}
                            </span>
                                </div>
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content
                            sideOffset={8}
                            className="z-50 min-w-[200px] bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 p-1.5 animate-in fade-in zoom-in duration-200"
                        >
                            <div className="px-3 py-2 mb-1 border-b border-gray-100 dark:border-gray-800">
                                <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Email</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate font-medium">{user.email}</p>
                            </div>

                            <DropdownMenu.Item
                                onClick={openProfile}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer outline-none transition-colors"
                            >
                                <FontAwesomeIcon icon={faUser} className="w-4 h-4 opacity-70" />
                                Профіль
                            </DropdownMenu.Item>

                            {user.roles.includes("Admin") && (
                                <DropdownMenu.Item asChild>
                                    <Link
                                        to="/Admin/home"
                                        className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-400/10 rounded-lg cursor-pointer outline-none transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
                                        Адмін панель
                                    </Link>
                                </DropdownMenu.Item>
                            )}

                            <DropdownMenu.Item
                                onClick={logoutUser}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer outline-none transition-colors mt-1"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                                Вийти
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                ) : (
                    <div className="hidden md:flex items-center gap-3">
                        <button onClick={handleLoginRedirect} className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-xl font-bold hover:bg-yellow-500 shadow-md shadow-yellow-400/20 active:scale-95 transition-all">
                            Вхід
                        </button>
                        <button onClick={handleSignUpRedirect} className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-xl font-bold hover:bg-yellow-500 shadow-md shadow-yellow-400/20 active:scale-95 transition-all">
                            Реєстрація
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default MainHeader;
