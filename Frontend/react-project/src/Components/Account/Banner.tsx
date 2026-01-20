import React from 'react';

interface AuthBannerProps {
    title: string;
    highlightText: string;
    description: string;
    image: string;
}

const AuthBanner: React.FC<AuthBannerProps> = ({
                                                   title,
                                                   highlightText,
                                                   description,
                                                   image
                                               }) => {
    return (
        <div className="lg:w-1/2 flex flex-col h-84 lg:h-screen justify-center px-10 relative overflow-hidden">
            {/* Фон */}
            <img
                src={image}
                alt="Auth background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Шар затемнення та блюр */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-black/60 backdrop-blur-[4px]"></div>

            {/* Контент */}
            <div className="relative z-10 max-w-md text-white">
                <h1 className="text-4xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                    {title} <br />
                    <span className="text-amber-400">{highlightText}</span>
                </h1>
                <p className="text-xl text-gray-100 mb-10 leading-relaxed opacity-90">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default AuthBanner;