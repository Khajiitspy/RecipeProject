import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store";
import {logout} from "../../store/authSlice.ts";
import {APP_ENV} from "../../env";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faHouse, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function UserDropdown() {
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

    function returnHome(){
        navigate("/");
    }


    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-3 focus:outline-none group transition-all active:scale-95 text-left">
                    {/* АВАТАР АДМІНІСТРАТОРА */}
                    <div className="relative">
                        <img
                            src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                            alt="Admin Avatar"
                            className="w-11 h-11 rounded-full border-2 border-yellow-400 shadow-lg shadow-yellow-400/20 object-cover p-0.5 transition-all duration-300"
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-gray-950 rounded-full bg-yellow-400 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </span>
                    </div>


                    <div className="hidden md:flex flex-col leading-tight">
                        <span className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-yellow-500 transition-colors flex items-center gap-1.5 tracking-tighter">
                            {user?.name}
                            <FontAwesomeIcon icon={faCrown} className="text-yellow-400 text-[11px]" />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            Адміністратор
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
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate font-medium">{user?.email}</p>
                </div>

                <DropdownMenu.Item
                    onClick={openProfile}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-gray-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-400/10 rounded-lg cursor-pointer outline-none transition-colors"
                >
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    Профіль
                </DropdownMenu.Item>

                <DropdownMenu.Item
                    onClick={returnHome}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-gray-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-400/10 rounded-lg cursor-pointer outline-none transition-colors"
                >
                    <FontAwesomeIcon icon={faHouse} className="w-4 h-4" />
                    Повернутися на головну
                </DropdownMenu.Item>



                <DropdownMenu.Item
                    onClick={logoutUser}
                    className="flex items-center gap-3 ml-1 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer outline-none transition-colors mt-1"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                    Вийти
                </DropdownMenu.Item>
            </DropdownMenu.Content>


        </DropdownMenu.Root>
    );
}
