import { Link } from "react-router";

export const MainHeader = () => {
    return (
        <header className="w-full py-2 px-6 bg-yellow-100  shadow-md flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
            <div className="hidden items-center gap-1 lg:flex">
                <Link to="/" className="text-2xl font-semibold font-['Comic_Sans_MS'] text-gray-800 ">
                    EatLog
                </Link>
            </div>

            <div className="flex items-center">
                <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-500  font-semibold py-2 px-2 rounded-full transition-all duration-300"
                >
                    Вхід
                </Link>

                <span className="text-gray-700">/</span>

                <Link
                    to="/register"
                    className="text-gray-700 hover:text-gray-500 font-semibold py-2 px-2 rounded-full transition-all duration-300"
                >
                    Реєстрація
                </Link>
            </div>


        </header>
    );
};

export default MainHeader;
