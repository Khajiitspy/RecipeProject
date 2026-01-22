import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export const MainFooter = () => {
    return (
        <footer className="bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 py-16 px-6 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Блок 1: Про проект */}
                <div className="col-span-1">
                    <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 inline-block">
                        Eat<span className="text-yellow-400">Log</span>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Ваш щоденний гід у світі смачної їжі. Створюйте, діліться та зберігайте улюблені рецепти в одному місці.
                    </p>
                </div>

                {/* Блок 2: Меню */}
                <div>
                    <h3 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Меню</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="hover:text-yellow-500 transition-colors">Головна</Link></li>
                        <li><Link to="/popular" className="hover:text-yellow-500 transition-colors">Популярне</Link></li>
                        <li><Link to="/answers" className="hover:text-yellow-500 transition-colors">Спільнота (Beta)</Link></li>
                    </ul>
                </div>

                {/* Блок 3: Контакти та Розсилка */}
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Підпишіться на смачні новини</h3>
                    <div className="flex max-w-md group">
                        <input
                            type="email"
                            placeholder="Ваш email"
                            className="w-full px-4 py-3 rounded-l-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-yellow-400 dark:focus:border-yellow-400 text-gray-800 dark:text-gray-200 outline-none transition-all"
                        />
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-r-xl transition-all font-bold shadow-lg shadow-yellow-400/20 active:scale-95">
                            Ok
                        </button>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <a href="mailto:support@eatlog.com" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 shadow-sm">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Нижня частина */}
            <div className="max-w-7xl mx-auto border-t border-gray-100 dark:border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                <p>© 2026 EatLog Project. Створено з любов'ю до їжі.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-yellow-500 transition-colors">Політика конфіденційності</a>
                    <a href="#" className="hover:text-yellow-500 transition-colors">Умови використання</a>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
