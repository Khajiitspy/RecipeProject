import React, { useState } from "react";
import { useRegisterMutation } from "../../api/userService";
import {Link, useNavigate} from "react-router";
import foodImage from "../../assets/food.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ImageUploadFormItem from "../../Components/UI/ImageUploadFormItem.tsx";
import {useAppDispatch} from "../../store";
import {loginSuccess} from "../../store/authSlice.ts";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import AuthBanner from "../../Components/Account/Banner.tsx";

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [register, { isLoading, error }] = useRegisterMutation();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ImageFile: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // @ts-ignore
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await register(form).unwrap();
            dispatch(loginSuccess(result.token));
            navigate("/");
        } catch (err) {
            console.error("Register error:", err);
        }
    };

    return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        {/* ЛІВА ЧАСТИНА: Привітання (ховається на мобільних) */}
        <AuthBanner
            title="Приєднуйся до"
            highlightText="Нашої родини!"
            description="Стань частиною великої спільноти гурманів. Ділися своїми рецептами, оцінюй роботи інших та знаходь кулінарне натхнення щодня."
            image={foodImage}
        />

        {/* ПРАВА ЧАСТИНА: Форма входу */}
        <div className="w-full lg:w-1/2 flex flex-col mb-10   justify-center px-8 md:px-24 lg:px-32">
            <div className="max-w-md w-full mx-auto">
                <div className="mb-8 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-slate-900">Реєстрація</h2>
                    <p className="text-slate-500 mt-2">
                        Вже маєте акаунт? {" "}
                        <Link to="/account/login" className="text-amber-300 font-semibold hover:underline">
                            Вхід
                        </Link>
                    </p>
                </div>

                {/* Форма */}
                <form className="space-y-3 flex-col" onSubmit={handleSubmit}>

                    <div className="flex  gap-4">
                        <input
                            type="text"
                            name="FirstName"
                            placeholder="First name"
                            value={form.FirstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300/20  transition"
                        />
                        <input
                            type="text"
                            name="LastName"
                            placeholder="Last name"
                            value={form.LastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300/20  transition"
                        />
                    </div>

                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={form.Email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300/20  transition"
                    />


                    <div className="relative">
                        <input
                            name="Password"
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300/20 transition"
                            placeholder="Password"
                            value={form.Password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            // При натисканні змінюємо true на false і навпаки
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {/* Змінюємо іконку залежно від стану */}
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>

                    <div>
                        <ImageUploadFormItem name="ImageFile" onFileSelect={(file) => setForm(prev => ({ ...prev, ImageFile: file }))} />
                    </div>

                    <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-amber-300 hover:bg-amber-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all duration-200 mt-6 flex justify-center items-center gap-2"
                    >
                    {isLoading ? "Створення акаунту..." : "Зареєструватися"}
                    </button>

                    {error && <p style={{ color: "red" }}>Invalid email or password</p>}
            </form>
        </div>
    </div>
</div>


)
    ;
};

export default RegisterPage;
