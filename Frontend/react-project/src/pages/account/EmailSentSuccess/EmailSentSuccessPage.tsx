import React from "react";


const EmailSentSuccessPage: React.FC = () => {
    return (
        <div className="min-h-[550px] flex flex-col items-center justify-center p-6">
            <div className="bg-red-600 text-white rounded-xl shadow-lg p-10 max-w-md text-center">
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
                <button
                    onClick={() => window.location.href = "/account/login"}
                    className="bg-white text-red-600 font-semibold px-6 py-2 rounded hover:bg-red-50 transition"
                >
                    Повернутись до входу
                </button>
            </div>
        </div>
    );
}


export  default EmailSentSuccessPage;