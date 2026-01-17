import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faQuoteLeft, faStar} from "@fortawesome/free-solid-svg-icons";
import foodImage from "../../../assets/food.jpg";
import dishImage from "../../../assets/dish.jpg";
import {useAppSelector} from "../../../store";
import {useNavigate} from "react-router";




const testimonials = [
    {
        id: 1,
        name: "Олена Петренко",
        role: "Домашній кухар",
        text: "EatLog допоміг мені нарешті впорядкувати всі мої записи. Тепер мої улюблені рецепти завжди під рукою!",
        image: "https://i.pravatar.cc/150?u=1",
        rating: 5
    },
    {
        id: 2,
        name: "Максим Коваль",
        role: "Фуд-блогер",
        text: "Дуже зручний інтерфейс! Можливість додавати власні пости та ділитися ними з друзями — це саме те, що я шукав.",
        image: "https://i.pravatar.cc/150?u=2",
        rating: 5
    },
    {
        id: 3,
        name: "Анна Сидоренко",
        role: "Веган-ентузіаст",
        text: "Пошук за інгредієнтами працює бездоганно. Тепер планування вечері займає лічені хвилини.",
        image: "https://i.pravatar.cc/150?u=3",
        rating: 4
    }
];

const UserHomePage: React.FC = () => {
    const { user } = useAppSelector(state=>state.auth);
    const navigate = useNavigate();


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

            {!user && (
                <section className="relative h-[500px] m-4">
                    <div className="w-full mx-auto bg-amber-300 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
                        {/* Декоративні елементи (можна додати іконки їжі на фоні) */}
                        <div className="relative z-10 text-center md:text-left md:max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                                Зберігайте власні рецепти та плануйте меню разом із нами
                            </h2>
                            <p className="text-slate-800 text-lg opacity-90 mb-8">
                                Приєднуйтесь до EatLog, щоб створювати власну цифрову кулінарну книгу та ділитися смаком із друзями.
                            </p>
                            <button
                                onClick={() => navigate('/account/register')}
                                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                            >
                                Зареєструватися безкоштовно
                            </button>
                        </div>


                        <div className="hidden lg:block relative z-10">
                            <img src={dishImage} className="w-80 rotate-12 drop-shadow-2xl" alt="Dish" />
                        </div>
                    </div>
                </section>
            )}


            <section className="py-10 px-6 -mt-10  bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            Що говорять наші кулінари
                        </h2>
                        <p className="text-slate-600 text-lg">Приєднуйтесь до тисяч задоволених користувачів EatLog</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((item) => (
                            <div key={item.id} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 relative hover:-translate-y-2 transition-transform duration-300">
                                <FontAwesomeIcon icon={faQuoteLeft} className="absolute top-6 right-8 text-amber-200 text-4xl opacity-50" />

                                <div className="flex gap-1 text-amber-400 mb-4">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar} size="xs" />
                                    ))}
                                </div>

                                <p className="text-slate-700 italic mb-8 relative z-10">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
                                    />
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default UserHomePage;
