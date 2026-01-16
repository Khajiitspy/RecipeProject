import { Link } from "react-router";

const UserHomePage: React.FC = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-brand to-blue-600 text-white">
                <div className="max-w-screen-xl mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Cooking made fun
                    </h1>

                    <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-10 opacity-90">
                        Create, organize, and discover recipes — all in one place.
                    </p>

                    <Link
                        to="/recipes"
                        className="
                            inline-block bg-white text-brand font-semibold
                            px-10 py-4 rounded-xl shadow-lg
                            hover:bg-blue-50 hover:shadow-2xl
                            transition active:scale-95
                        "
                    >
                        Explore recipes
                    </Link>
                </div>
            </section>

            {/* Future content section */}
            <section className="max-w-screen-xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-heading mb-6">
                    Why Recipe Project?
                </h2>
                <p className="text-body max-w-3xl">
                    Save your favorite meals, manage shopping lists, and get inspired
                    by recipes from other users.
                </p>
            </section>
        </div>
    );
};

export default UserHomePage;
