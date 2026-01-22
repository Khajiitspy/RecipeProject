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
        text: "Дуже зручний інтерфейс! Можливість додавати власні пости та ділитися ними з друзями",
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
                        Готуйте із задоволенням
                    </h1>
                    <p className="text-slate-100 text-xl md:text-2xl mb-10 drop-shadow-md">
                        Створюйте, впорядковуйте та відкривайте нові рецепти — все в одному місці.
                    </p>

                    <div className="relative max-w-2xl mx-auto font-sans">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Пошук рецептів..."
                            className="w-full py-5 pl-14 pr-6 rounded-full text-lg bg-white/95 backdrop-blur-sm shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100/50 text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                </div>


            </section>


            {!user && (
                <section className="relative m-6  transition-colors duration-300">
                    <div className="w-full mx-auto bg-yellow-400 dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-20 flex flex-col md:flex-row items-center justify-between overflow-hidden relative border border-transparent dark:border-gray-800 shadow-2xl shadow-yellow-400/10 dark:shadow-none">

                        {/* Декоративне фонове світіння для темної теми */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl hidden dark:block"></div>

                        <div className="relative z-10 text-center md:text-left md:max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tighter">
                                Зберігайте власні рецепти та плануйте меню разом із нами
                            </h2>
                            <p className="text-gray-800 dark:text-gray-300 text-lg md:text-xl font-medium mb-10 opacity-90 leading-relaxed">
                                Приєднуйтесь до <span className="font-bold dark:text-yellow-400">EatLog</span>, щоб створювати власну цифрову кулінарну книгу та ділитися смаком із друзями.
                            </p>
                            <button
                                onClick={() => navigate('/account/register')}
                                className="bg-gray-900 dark:bg-yellow-400 text-white dark:text-gray-950 px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-900/20 dark:shadow-yellow-400/10"
                            >
                                Зареєструватися безкоштовно
                            </button>
                        </div>

                        {/* Зображення страви */}
                        <div className="hidden lg:block relative z-10 group">
                            <img
                                src={dishImage}
                                className="w-96 rotate-12 drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                                alt="Delicious Dish"
                            />
                        </div>
                    </div>
                </section>
            )}


            <section className="py-20 px-6 bg-white dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    {/* Заголовок секції */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">
                            Що говорять наші <span className="text-yellow-400">кулінари</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                            Приєднуйтесь до тисяч задоволених користувачів EatLog, які щодня створюють шедеври.
                        </p>
                    </div>

                    {/* Грід з картками */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative hover:-translate-y-2 transition-all duration-300"
                            >
                                {/* Велика іконка цитати */}
                                <FontAwesomeIcon
                                    icon={faQuoteLeft}
                                    className="absolute top-8 right-8 text-yellow-400 opacity-10 dark:opacity-20 text-5xl transition-transform group-hover:scale-110"
                                />

                                {/* Рейтинг зірками */}
                                <div className="flex gap-1 text-yellow-400 mb-6">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar} className="text-[10px]" />
                                    ))}
                                </div>

                                {/* Текст відгуку */}
                                <p className="text-gray-700 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed font-medium">
                                    "{item.text}"
                                </p>

                                {/* Автор відгуку */}
                                <div className="flex items-center gap-4 border-t border-gray-50 dark:border-gray-800 pt-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shadow-sm"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white leading-none mb-1">
                                            {item.name}
                                        </h4>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">
                                            {item.role}
                                        </p>
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
