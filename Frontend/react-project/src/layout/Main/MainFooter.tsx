import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export const MainFooter = () => {
    return (
        <footer className="bg-amber-300 text-gray-800 border-t border-gray-200 dark:border-gray-800 py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Блок 1: Про проект */}
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-gray-800 text-2xl font-bold mb-4">
                        EatLog
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Ваш щоденний гід у світі смачної їжі. Створюйте, діліться та зберігайте улюблені рецепти в одному місці.
                    </p>
                </div>


                <div>
                    <h3 className="text-gray-800 font-semibold mb-4 uppercase tracking-wider text-sm">Меню</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-purple-400 transition">Головна</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition">Популярне</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition">Спільнота</a></li>
                    </ul>
                </div>

                {/* Блок 3: Контакти та Розсилка */}
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-gray-800 font-semibold mb-4 uppercase tracking-wider text-sm">Підпишіться на смачні новини</h3>
                    <div className="flex max-w-md">
                        <input
                            type="email"
                            placeholder="Ваш email"
                            className="w-full px-4 py-2 rounded-l-lg bg-white border-none focus:ring-2 focus:ring-gray-600 text-gray-800 outline-none"
                        />
                        <button className="bg-gray-800 hover:bg-gray-600 text-white px-6 py-2 rounded-r-lg transition-all font-medium">
                            Ok
                        </button>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center  text-white transition-all">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                </div>

            </div>


            <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>© 2026 EatLog Project. Створено з любов'ю до їжі.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white">Політика конфіденційності</a>
                    <a href="#" className="hover:text-white">Умови використання</a>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
