import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import {
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    UserIcon
} from "../../icons";
import { useSidebar } from "../../context/SidebarContext.tsx";
import {Helmet} from "react-helmet-async";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: <GridIcon />,
        name: "Головна",
        subItems: [{ name: "Панель", path: "/admin/home", pro: false }],
    },
    {
        name: "Користувачі",
        icon: <UserIcon />,
        subItems: [
            { name: "Список", path: "/admin/users", pro: false }
        ],
    }
];



const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "others";
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    );
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => location.pathname === path;
    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
    );



    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
        <ul className="flex flex-col gap-2"> {/* Зменшив gap між пунктами для компактності */}
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group w-full flex items-center transition-all duration-200 ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "menu-item-active bg-slate-50 dark:bg-slate-800/50"
                                    : "menu-item-inactive hover:bg-slate-50 dark:hover:bg-slate-800/30"
                            } cursor-pointer px-3 py-2.5 rounded-xl ${
                                !isExpanded && !isHovered
                                    ? "justify-center"
                                    : "justify-start gap-3"
                            }`}
                        >
                            {/* Контейнер для іконки */}
                            <span
                                className={`flex shrink-0 items-center justify-center transition-colors ${
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? "text-amber-500" // Акцентний колір EatLog
                                        : "text-slate-500 dark:text-slate-400 group-hover:text-amber-500"
                                }`}
                            >
                            {nav.icon}
                        </span>


                            {(isExpanded || isHovered || isMobileOpen) && (
                                <>
                                <span className="text-sm font-medium truncate flex-1 text-left">
                                    {nav.name}
                                </span>
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            openSubmenu?.type === menuType &&
                                            openSubmenu?.index === index
                                                ? "rotate-180 text-amber-500"
                                                : "text-slate-400"
                                        }`}
                                    />
                                </>
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group flex items-center px-3 py-2.5 rounded-xl transition-all ${
                                    isActive(nav.path)
                                        ? "menu-item-active bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                                        : "menu-item-inactive hover:bg-slate-50 dark:hover:bg-slate-800/30"
                                } ${
                                    !isExpanded && !isHovered
                                        ? "justify-center"
                                        : "justify-start gap-3"
                                }`}
                            >
                            <span className={`flex shrink-0 items-center justify-center ${
                                isActive(nav.path) ? "text-amber-500" : "text-slate-500 dark:text-slate-400"
                            }`}>
                                {nav.icon}
                            </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="text-sm font-medium truncate">
                                    {nav.name}
                                </span>
                                )}
                            </Link>
                        )
                    )}

                    {/* Випадаючий список підпунктів */}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300 ease-in-out"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-1 space-y-1 ml-8 border-l border-slate-100 dark:border-slate-800">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`block py-2 px-4  text-sm rounded-lg transition-colors ${
                                                isActive(subItem.path)
                                                    ? "text-amber-600 font-bold bg-amber-50/50 dark:bg-amber-500/5 dark:text-amber-400"
                                                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                            }`}
                                        >
                                            {subItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <Helmet>
                <title>Admin Panel</title>
            </Helmet>


            <aside
                className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 transition-all duration-300 ease-in-out z-50 border-r 
                bg-white text-gray-900 h-screen
                dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800 
                ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0`}
                onMouseEnter={() => !isExpanded && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >



                <div
                    className={`py-8 flex ${
                        !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                    }`}
                >
                    <Link to="/Admin/home" className="flex items-center group">
                        {isExpanded || isHovered || isMobileOpen ? (

                            <span
                                className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white transition-all">
                                Eat<span className="text-yellow-400 group-hover:text-yellow-500 transition-colors">Log</span>
                            </span>
                        ) : (
                            <span
                                className="text-2xl font-black text-yellow-500 bg-yellow-50 dark:bg-yellow-400/10 w-11 h-11 flex items-center justify-center rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-400/20 group-hover:scale-110 transition-all duration-300">
                                E
                            </span>
                        )}
                    </Link>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto min-h-0 duration-300 ease-linear no-scrollbar">
                    <nav className="mb-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2
                                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 dark:text-gray-500 ${
                                        !isExpanded && !isHovered
                                            ? "lg:justify-center"
                                            : "justify-start"
                                    }`}
                                >
                                    {isExpanded || isHovered || isMobileOpen ? (
                                        "Menu"
                                    ) : (
                                        <HorizontaLDots className="size-6"/>
                                    )}
                                </h2>
                                {renderMenuItems(navItems, "main")}
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
);
};

export default AppSidebar;