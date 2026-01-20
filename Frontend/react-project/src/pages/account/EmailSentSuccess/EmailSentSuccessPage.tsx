import React from "react";
import AuthBanner from "../../../Components/Account/Banner.tsx";
import foodImage from "../../../assets/food.jpg";
import {HiOutlineArrowLeft} from "react-icons/hi";
import {Link} from "react-router";


const EmailSentSuccessPage: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">

            <AuthBanner
                title="Забули"
                highlightText="Пароль?"
                description="Не хвилюйтеся! Просто введіть свою пошту, і ми надішлемо вам інструкції для відновлення доступу."
                image={foodImage}
            />


            <div className="w-full lg:w-1/2 flex flex-col justify-center  py-12 px-8 md:px-20 lg:px-32 bg-white   z-20 lg:mt-0">

                <Link
                    to="/account/login"
                    className="flex items-center text-gray-400 hover:text-amber-500 transition-colors mb-8 group"
                >
                    <HiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Повернутися до входу
                </Link>

                <h1 className="text-3xl font-bold mb-4">Лист надіслано!</h1>
                <p className="mb-6 text-lg">
                    Перевірте вашу електронну пошту. Ми надіслали вам інструкції для відновлення паролю.
                </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-6 h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
                </svg>

            </div>
        </div>
    );
}


export  default EmailSentSuccessPage;