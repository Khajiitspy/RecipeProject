import React from "react";
import {Form, type FormProps, Input} from "antd";
import {useLocation, useNavigate} from "react-router";
import LoadingOverlay from "../../../Components/UI/loading/LoadingOverlay.tsx";
import {useResetPasswordMutation} from "../../../api/userService.ts";
import type {IResetPasswordRequest} from "../../../types/user/IReserPassword.ts";
import AuthBanner from "../../../Components/Account/Banner.tsx";
import foodImage from "../../../assets/food.jpg";



const ResetPasswordPage: React.FC = () => {
    const [reset, { isLoading }] = useResetPasswordMutation();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const email = query.get("email") || "";
    const token = query.get("token") || "";

    const navigate = useNavigate();

    const onFinish: FormProps<IResetPasswordRequest>["onFinish"] = async (values) => {
        try {
            console.log("values", values);
            // @ts-ignore
            await reset({ ...values, email, token }).unwrap();
            navigate('/account/login');
        } catch (err) {
            console.log("error", err);
            alert("failed");
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

            <div className="w-full lg:w-1/2 flex flex-col justify-center  py-12 px-8 md:px-20 lg:px-32 bg-white z-20 lg:mt-0">
                {(isLoading)  && <LoadingOverlay />}
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Зміна паролю</h2>
                <p className="text-gray-500 mb-8">
                    Введіть новий пароль.
                </p>

                <Form<IResetPasswordRequest>
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item<IResetPasswordRequest>
                        name="newPassword"
                        label="Password"
                        rules={[{ required: true, message: "Enter your password" }]}
                    >
                        <Input.Password
                            placeholder="••••••••"
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
                        className="w-full bg-amber-300 hover:bg-amber-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all duration-200 mt-6 flex justify-center items-center gap-2"
                    >
                        {isLoading ? "Зміна паролю..." : "Змінити пароль"}
                    </button>

                </Form>
            </div>
        </div>

    );




}

export default ResetPasswordPage;