import { Link } from "react-router";

export const MainHeader = () => {
    return (
        <header className="sticky top-0 z-50 bg-neutral-primary border-b border-default shadow-sm">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4">
                {/* Navigation */}
                <ul className="hidden md:flex items-center gap-8 font-medium">
                    <li>
                        <Link
                            to="/recipe/create"
                            className="text-heading hover:text-fg-brand transition"
                        >
                            Add Recipe
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/register"
                            className="
                                px-4 py-2 rounded-lg
                                bg-brand text-white
                                hover:bg-brand/90 transition
                            "
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className="
                                px-4 py-2 rounded-lg
                                bg-brand text-white
                                hover:bg-brand/90 transition
                            "
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
