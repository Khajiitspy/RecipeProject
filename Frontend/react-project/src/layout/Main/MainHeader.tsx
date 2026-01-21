import {Link, useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {logout} from "../../store/authSlice.ts";
import {faBars, faChevronDown, faCrown, faLock, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {APP_ENV} from "../../env";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


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
        <header className="relative w-full py-2 px-6 bg-amber-300  shadow-md flex justify-between items-center border-b border-gray-200 dark:border-gray-800">

            <div className="z-10">
                <button
                    onClick={toggleMobileMenu}
                    className="text-gray-800 text-2xl md:hidden focus:outline-none"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex lg:hidden items-center pointer-events-none">
                <Link
                    to="/"
                    className="text-2xl font-semibold text-gray-800 pointer-events-auto"
                >
                    EatLog
                </Link>
            </div>


            <nav className="flex items-center gap-4 ml-auto">
                {user ? (
                    user.roles.includes("Admin") ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="flex items-center gap-2 focus:outline-none">
                                    <div className="relative">
                                        <img
                                            src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full border-2 border-amber-400 shadow-md object-cover p-0.5"
                                        />
                                        <span
                                            className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center">
                                         <div className="w-1 h-1 bg-white rounded-full"></div>
                                         </span>
                                    </div>

                                    <div className="hidden md:flex flex-col items-start leading-tight">
                                        <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                                            {user?.name}
                                            <FontAwesomeIcon icon={faCrown} className="text-amber-500 text-[15px] mt-1"/>
                                        </span>
                                        <span className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">
                                            Адміністратор
                                        </span>
                                    </div>
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content
                                sideOffset={8}
                                className="z-50 mt-2 min-w-[140px] min-h-[160px] mr-3 bg-white rounded-md shadow-lg border border-gray-200 p-1"
                            >

                                <div className="text-gray-600 text-sm px-3 py-2 border-b border-gray-200">
                                    {user.email}
                                </div>
                                <DropdownMenu.Item
                                    onClick={openProfile}
                                    className="flex items-center text-black
                                    hover:bg-gray-200 px-2  py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="text-black w-5 h-5 mr-3"
                                    />
                                    Профіль
                                </DropdownMenu.Item>

                                <DropdownMenu.Item asChild>
                                    <Link
                                        to="/Admin/home"
                                        className="flex items-center text-black
                                    hover:bg-gray-200 px-2  py-2 rounded
                                    cursor-pointer text-sm transition-colors border-b">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="text-black w-5 h-5 mr-3"
                                        />
                                        Адмін панель
                                    </Link>
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                    onClick={logoutUser}
                                    className="flex items-center  text-black
                                    hover:bg-gray-200 px-2  py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className="text-black w-5 h-5 mr-3"
                                    />
                                    Вийти
                                </DropdownMenu.Item>

                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    ) : (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="flex items-center gap-2 focus:outline-none">

                                    <div className="relative">
                                        <img
                                            src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                                        />
                                        {/* Маленька крапка "онлайн", якщо захочете */}
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>

                                    <div className="hidden md:flex flex-col items-start leading-tight">
                                    <span
                                        className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                                        {user?.name}
                                    </span>
                                        <span
                                            className="text-[11px] text-gray-600 font-medium uppercase tracking-wider">
                                        Мій профіль
                                       </span>
                                    </div>

                                    {/* Іконка шеврона (стрілочка) */}
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="text-[10px] text-gray-800 group-hover:text-amber-500 transition-colors ml-1"
                                    />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content
                                sideOffset={8}
                                className="z-50 mt-2 min-w-[140px] mr-3 bg-white rounded-md shadow-lg border border-gray-200 p-1"
                            >
                                <div className="text-gray-600 text-sm px-3 py-2 border-b border-gray-200">
                                    {user.email}
                                </div>

                                <DropdownMenu.Item
                                    onClick={openProfile}
                                    className="flex items-center text-black
                                    hover:bg-gray-200 px-2  py-2 rounded
                                    cursor-pointer text-sm transition-colors border-b">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="text-black w-5 h-5 mr-3"
                                    />
                                    Профіль
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                    onClick={logoutUser}
                                    className="flex items-center  text-black
                                    hover:bg-gray-200 px-2  py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className="text-black w-5 h-5 mr-3"
                                    />
                                    Вийти
                                </DropdownMenu.Item>

                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    )
                ) : (
                    <div className="flex items-center gap-4">

                        <div className="hidden md:flex items-center gap-4">
                            <button onClick={handleLoginRedirect} className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:ring-2 hover:ring-amber-300 transition-all">
                                Вхід
                            </button>
                            <button onClick={handleSignUpRedirect} className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:ring-2 hover:ring-amber-300 transition-all">
                                 Реєстрація
                            </button>
                        </div>


                    </div>
                )}
            </nav>


        </header>
    );
};

export default MainHeader;
