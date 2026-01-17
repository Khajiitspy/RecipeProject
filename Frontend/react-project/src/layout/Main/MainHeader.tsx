import { Link } from "react-router";

export const MainHeader = () => {
    return (
        <header className="w-full py-2 px-6 bg-amber-300  shadow-md flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
            <div className="hidden items-center gap-1 lg:flex">
                <Link to="/" className="text-2xl font-semibold  text-gray-800 ">
                    EatLog
                </Link>
            </div>

            <div className="flex items-center">
                <Link
                    to="/account/login"
                    className="text-gray-700 hover:text-gray-500  font-semibold py-2 px-2 rounded-full transition-all duration-300"
                >
                    Login
                </Link>

                <span className="text-gray-700">/</span>

                <Link
                    to="/account/register"
                    className="text-gray-700 hover:text-gray-500 font-semibold py-2 px-2 rounded-full transition-all duration-300"
                >
                    Sign up
                </Link>
            </div>


        </header>
    );
};

export default MainHeader;
