import { useState } from "react";
import { useRegisterMutation } from "../../api/userService";
// @ts-ignore
import type { IRegisterUser } from "../../types/account/IRegisterUser";
import { useNavigate } from "react-router";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [register, { isLoading, error }] = useRegisterMutation();

    const [form, setForm] = useState<IRegisterUser>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        imageFile: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        // @ts-ignore
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await register(form).unwrap();

            // store JWT
            localStorage.setItem("token", result.token);

            navigate("/");
        } catch (err) {
            console.error("Register error:", err);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-neutral-primary p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-heading mb-6 text-center">
                    Create an account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="input"
                    />

                    <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleChange}
                        className="block w-full text-sm"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand/90 transition"
                    >
                        {isLoading ? "Creating account..." : "Register"}
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            Registration failed
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
