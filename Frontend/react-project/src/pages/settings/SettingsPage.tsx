import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShieldHalved, faPalette, faBell, faCamera, faKey } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAppSelector } from "../../store";
import { APP_ENV } from "../../env";

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user } = useAppSelector(state => state.auth);


    const menuItems = [
        { id: 'profile', label: 'Профіль', icon: faUser },
        { id: 'security', label: 'Безпека', icon: faShieldHalved },
        { id: 'appearance', label: 'Інтерфейс', icon: faPalette },
        { id: 'notifications', label: 'Сповіщення', icon: faBell },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

            <div className="flex flex-col mt-3 md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">Налаштування</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
                        Вітаємо, <span className="text-yellow-400 font-bold">{user?.name}</span>! Налаштуйте свій профіль під себе.
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.8rem] font-black uppercase text-[10px] tracking-widest transition-all duration-300
                                ${activeTab === item.id
                                    ? 'bg-yellow-400 text-gray-950 shadow-lg shadow-yellow-400/30 scale-[1.02]'
                                    : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200'}`}
                            >
                                <FontAwesomeIcon icon={item.icon} className={`text-sm ${activeTab === item.id ? 'opacity-100' : 'opacity-50'}`} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/40 dark:shadow-none overflow-hidden min-h-[600px] flex flex-col">

                    {activeTab === 'profile' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full">
                            <div className="p-10 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    <div className="relative group">
                                        <img
                                            src={`${APP_ENV.IMAGES_800_URL}${user?.image}`}
                                            className="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-white dark:border-gray-800 shadow-2xl transition-transform group-hover:scale-105"
                                            alt="Profile"
                                        />
                                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 text-gray-900 rounded-2xl flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-colors">
                                            <FontAwesomeIcon icon={faCamera} />
                                        </button>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Ваше фото</h4>
                                        <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ФОРМА ПРОФІЛЮ */}
                            <div className="p-10 space-y-8 flex-grow">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Повне ім'я</label>
                                    <input
                                        type="text"
                                        value={user?.name}
                                        className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-yellow-400 outline-none transition-all text-gray-900 dark:text-white font-black text-lg"
                                        placeholder="Як вас звати?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Про себе</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-yellow-400 outline-none transition-all text-gray-900 dark:text-white font-medium resize-none"
                                        placeholder="Ваш кулінарний девіз..."
                                    />
                                </div>
                            </div>

                            {/* ФУТЕР — Збереження */}
                            <div className="p-10 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-50 dark:border-gray-800 flex justify-end">
                                <button className="bg-yellow-400 text-gray-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-yellow-500 transition-all active:scale-95 shadow-xl shadow-yellow-400/20">
                                    Зберегти профіль
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Безпека акаунта</h3>

                            {/* СТАТУС GOOGLE */}
                            <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-800 flex items-center justify-between border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">
                                        <FontAwesomeIcon icon={faGoogle} className="text-blue-500 text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">Google Authentication</p>
                                        <p className="text-xs text-green-500 font-bold uppercase tracking-widest">Підключено</p>
                                    </div>
                                </div>
                            </div>

                            {/* ЗМІНА ПАРОЛЯ */}
                            <div className="space-y-6 pt-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Новий пароль</label>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faKey} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="password" placeholder="••••••••" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-4 focus:ring-yellow-400/10 text-gray-900 dark:text-white" />
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:opacity-90 transition-all">
                                    Оновити пароль
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;