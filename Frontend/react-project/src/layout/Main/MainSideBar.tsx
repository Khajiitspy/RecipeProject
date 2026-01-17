import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faComments,
    faCompass,
    faAngleLeft,
    faAngleRight,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";




const MainSideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);
    return (
        <aside
            className={`h-screen  bg-amber-300  text-gray-800  flex flex-col border-r  border-gray-200 dark:border-gray-800 overflow-y-auto px-3 py-4 transition-all duration-300 ${
                collapsed ? "w-16" : "w-64"}`}
        >
            <div className={`flex ${collapsed ? "justify-center" : "justify-end"}`}>
                <button
                    onClick={toggleSidebar}
                    className="text-gray-800 hover:text-gray-400 dark:hover:text-gray-200 transition p-2"
                >
                    <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
                </button>
            </div>

            <nav className="space-y-2 mb-6">
                <Link
                    to="/"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400  transition"
                >
                    <FontAwesomeIcon icon={faHouse} className="w-4 h-4 text-gray-800 " />
                    {!collapsed && <span className="text-sm font-medium">Home</span>}
                </Link>

                <Link
                    to="/popular"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400 transition"
                >
                    <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-gray-800 " />
                    {!collapsed && <span className="text-sm font-medium">Popular</span>}
                </Link>

                <Link
                    to="/answers"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400 transition"
                >
                    <FontAwesomeIcon icon={faComments} className="w-4 h-4 text-gray-800 " />
                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Answers <span className="text-orange-500 dark:text-orange-400 text-xs ml-1">BETA</span>
                        </span>
                    )}
                </Link>

                <Link
                    to="/recipes/create"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400 dark:hover:bg-gray-80 transition"
                >
                    <FontAwesomeIcon icon={faCompass} className="w-4 h-4 text-gray-800" />
                    {!collapsed && <span className="text-sm font-medium">Add Recipe</span>}
                </Link>


                <Link
                    to="/post/add"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-400  transition"
                >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-gray-800 "/>
                    {!collapsed && <span className="text-sm font-medium">Add Post</span>}
                </Link>
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 mb-4"></div>
        </aside>
    );
};

export default MainSideBar;
