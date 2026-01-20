import { Form, type FormProps, Input } from 'antd';
import React from "react";
import {Link, useNavigate} from "react-router";
import LoadingOverlay from "../../../Components/UI/loading/LoadingOverlay.tsx";
import {useForgotPasswordMutation} from "../../../api/userService.ts";
import type {IForgotPasswordRequest} from "../../../types/user/IForgotPasswordResponse.ts";
import foodImage from "../../../assets/food.jpg";
import { HiOutlineMail, HiOutlineArrowLeft } from "react-icons/hi";
import type {IResetPasswordRequest} from "../../../types/user/IReserPassword.ts";
import AuthBanner from "../../../Components/Account/Banner.tsx";


const ForgotPasswordPage: React.FC = () => {
    const [forgot, { isLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate();


    const onFinish: FormProps<IForgotPasswordRequest>["onFinish"] = async (values) => {
        try {
            // @ts-ignore
            await forgot(values).unwrap();
            navigate('/account/email-sent-success');

        } catch (err) {
            console.log("error", err);
            alert("Login failed");
        }
    };


    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">

            <AuthBanner
                title="Забули"
                highlightText="Пароль?"
                description="Не хвилюйтеся! Просто введіть свою пошту, і ми надішлемо вам інструкції для відновлення доступу."
                image={foodImage}
            />


            {/* ПРАВА ЧАСТИНА: Форма */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center  py-12 px-8 md:px-20 lg:px-32 bg-white z-20 lg:mt-0">
                {isLoading && <LoadingOverlay />}

                <div className="max-w-md w-full mx-auto">
                    {/* Кнопка назад */}
                    <Link
                        to="/account/login"
                        className="flex items-center text-gray-400 hover:text-amber-500 transition-colors mb-8 group"
                    >
                        <HiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Повернутися до входу
                    </Link>

                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Відновлення</h2>
                    <p className="text-gray-500 mb-8">
                        Ми надішлемо вам лист із посиланням для створення нового пароля.
                    </p>

                    <Form<IResetPasswordRequest>
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        className="space-y-4"
                    >
                        <Form.Item
                            name="email"
                            label={<span className="text-gray-700 font-medium">Ваша електронна пошта</span>}
                            rules={[
                                { required: true, message: "Будь ласка, введіть Email" },
                                { type: 'email', message: "Введіть коректну адресу" }
                            ]}
                        >
                            <Input
                                prefix={<HiOutlineMail className="text-gray-400 mr-2"/>}
                                placeholder="example@mail.com"
                                size="large"
                                className="rounded-lg py-3
                                !border !border-gray-300
                                   hover:!border-amber-400
                                   focus-within:!border-amber-500
                                   focus-within:!ring-2
                                   focus-within:!ring-amber-500/20
                                   focus-within:!shadow-none
                                   transition-all duration-200"
                            />
                        </Form.Item>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-300 hover:bg-amber-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all duration-200 mt-6 flex justify-center items-center gap-2"
                        >
                            {isLoading ? 'Надсилаємо...' : 'Відновити пароль'}
                        </button>
                    </Form>

                    <div className="mt-10 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <p className="text-sm text-amber-800 text-center italic">
                            Перевірте папку "Спам", якщо лист не надійде протягом 5 хвилин.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
