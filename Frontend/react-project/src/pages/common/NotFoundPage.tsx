import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowLeft, faUtensils } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen -mt-5 flex flex-col justify-center items-center bg-white dark:bg-gray-950 p-6 overflow-hidden relative">


            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[20rem] md:text-[35rem] font-black text-gray-50 dark:text-gray-900/20 leading-none">
                    404
                </span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <img
                        src="https://media1.tenor.com/m/04Cbc1xMK68AAAAd/cooking-flavours.gif"
                        alt="Cooking fail"
                        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3rem] shadow-2xl relative z-10 border-4 border-white dark:border-gray-800"
                    />
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-12 z-20">
                        <FontAwesomeIcon icon={faUtensils} className="text-gray-900 text-2xl" />
                    </div>
                </div>


                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
                    Ой! Рецепт <span className="text-yellow-400">загубився</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md font-medium text-lg mb-12">
                    Здається, ця сторінка підгоріла або її ніколи не було в нашому меню. Спробуйте повернутися на головну.
                </p>


                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all duration-300 active:scale-95 border-2 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Назад
                    </button>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all duration-300 active:scale-95 shadow-xl bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-yellow-400/20"
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        На головну
                    </Link>
                </div>
            </div>


            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <p className="text-[10px]  font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-700">
                    EatLog / Error System
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;