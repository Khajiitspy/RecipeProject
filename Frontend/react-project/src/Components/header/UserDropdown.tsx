import {Dropdown} from "../ui/dropdown/Dropdown.tsx";
import {DropdownItem} from "../ui/dropdown/DropdownItem.tsx";
import {useNavigate} from "react-router";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {logout} from "../../store/authSlice.ts";
import {APP_ENV} from "../../env";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faGear, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";

export default function UserDropdown() {
    const { user } = useAppSelector(state=>state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    function logoutUser() {
        dispatch(logout());
        navigate('/');
    }

    return (

        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 focus:outline-none dropdown-toggle group"
            >
                {/* Аватар з рамкою та онлайн-крапкою з першого коду */}
                <div className="relative">
                    <img
                        src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border-2 border-amber-400 shadow-md object-cover p-0.5 transition-transform group-hover:scale-105"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
            </span>
                </div>

                {/* Ім'я та статус Адміна */}
                <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-bold text-slate-800 dark:text-gray-100 flex items-center gap-1">
                {user?.name}
                <FontAwesomeIcon icon={faCrown} className="text-amber-500 text-[12px]" />
            </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest">
                Адміністратор
            </span>
                </div>


                <svg
                    className={`text-gray-500 dark:text-gray-100 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
            >
                {/* Шапка дропдауну з поштою */}
                <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="ml-1.5 block text-[13px] text-gray-500 dark:text-gray-100 truncate">
                      {user?.email}
                    </span>
                </div>

                <ul className="flex flex-col gap-1 pt-3 pb-2 border-b border-gray-200 dark:border-gray-800">
                    {/* Пункт Профіль */}
                    <li>
                        <DropdownItem
                            onItemClick={() => {  closeDropdown(); }}
                            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-500 group-hover:text-amber-500" />
                            Мій профіль
                        </DropdownItem>
                    </li>


                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/5 dark:hover:text-gray-300 "
                        >
                            <FontAwesomeIcon icon={faGear} className="w-4 h-4 text-gray-500 group-hover:text-amber-500" />
                            Налаштування
                        </DropdownItem>
                    </li>
                </ul>

                {/* Кнопка Виходу */}
                <button
                    onClick={() => { logoutUser(); closeDropdown(); }}
                    className="flex ml-1.5 items-center gap-3 px-3 py-2  font-medium text-red-500 rounded-lg group text-theme-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                    Вийти з акаунту
                </button>
            </Dropdown>
        </div>
    );
}
