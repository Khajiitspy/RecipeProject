import React from "react";
import {Form, type FormProps, Input} from "antd";
import {useLocation, useNavigate} from "react-router";
import LoadingOverlay from "../../../Components/UI/loading/LoadingOverlay.tsx";
import {useResetPasswordMutation} from "../../../api/userService.ts";



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
        <div className="min-h-[560px] flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                {(isLoading)  && <LoadingOverlay />}
                <h2 className="text-2xl font-semibold mb-6 text-center">Відновлення паролю</h2>
                <Form<IResetPasswordRequest>
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item<IResetPasswordRequest>
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Enter your password" }]}
                    >
                        <Input.Password placeholder="••••••••" />
                    </Form.Item>

                    <Form.Item<IResetPasswordRequest>
                        name="confirmPassword"
                        label="Confirm password"
                        rules={[{ required: true, message: "Enter your password" }]}
                    >
                        <Input.Password placeholder="••••••••" />
                    </Form.Item>

                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        Відновити пароль
                    </button>

                </Form>
            </div>
        </div>

    );




}

export default ResetPasswordPage;