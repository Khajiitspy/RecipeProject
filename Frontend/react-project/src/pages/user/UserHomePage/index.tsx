import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import foodImage from "../../../assets/food.jpg";

const UserHomePage: React.FC = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center border-t border-gray-200 dark:border-gray-800 justify-center rounded-3xl m-4 overflow-hidden shadow-xl">

                {/* --- НОВЕ: Фонове зображення --- */}
                {/* absolute inset-0 розтягує картинку на весь блок. object-cover обрізає її, щоб заповнити простір без деформації */}
                <img
                    src={foodImage}
                    alt="Cooking background"
                    className="absolute inset-0 w-full h-full object-cover"
                />


                <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        Cooking made fun
                    </h1>
                    <p className="text-slate-100 text-xl md:text-2xl mb-10 drop-shadow-md">
                        Create, organize, and discover recipes — all in one place.
                    </p>

                    <div className="relative max-w-2xl mx-auto font-sans">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search recipes, ingredients..."
                            className="w-full py-5 pl-14 pr-6 rounded-full text-lg bg-white/95 backdrop-blur-sm shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100/50 text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                </div>


            </section>

            {/* Future content section */}
            <section>
            </section>
        </div>
    );
};

export default UserHomePage;
