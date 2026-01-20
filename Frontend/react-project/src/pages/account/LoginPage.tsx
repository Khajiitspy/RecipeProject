import React, { useState } from "react";
import {useLoginByGoogleMutation, useLoginMutation} from "../../api/userService";
import {Link, useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faSpinner} from "@fortawesome/free-solid-svg-icons";
import foodImage from "../../assets/food.jpg";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {useGoogleLogin} from "@react-oauth/google";
import AuthBanner from "../../Components/Account/Banner.tsx";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);

    const [login, {isLoading, error}] = useLoginMutation();
    const [loginByGoogle, {isLoading: isGoogleLoading}] = useLoginByGoogleMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();

      // Save token
      localStorage.setItem("token", result.token);

      // Redirect
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err);
    }
  };

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) =>
        {
            try {
                await loginByGoogle(tokenResponse.access_token).unwrap();
                // dispatch(loginSuccess(result.token));
                navigate('/');
            } catch (error) {

                console.log("User server error auth", error);
                // const serverError = error as ServerError;
                //
                // if (serverError?.status === 400 && serverError?.data?.errors) {
                //     // setServerErrors(serverError.data.errors);
                // } else {
                //     message.error("Сталася помилка при вході");
                // }
            }
        },
    });

  return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">

          <AuthBanner
              title="З поверненням до"
              highlightText="EatLog!"
              description="Увійдіть, щоб продовжити свою кулінарну подорож, зберігати улюблені рецепти та відкривати нові смаки кожного дня."
              image={foodImage}
          />

          {/* ПРАВА ЧАСТИНА: Форма входу */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center  px-10 md:px-24 lg:px-32">
              <div className="max-w-md w-full mx-auto">
                  <div className="mb-2 text-center lg:text-left">
                      <h2 className="text-3xl font-bold text-slate-900">Вхід</h2>
                      <p className="text-slate-500 mt-2">
                          Ще не маєте акаунту? {" "}
                          <Link to="/account/register" className="text-amber-300 font-semibold hover:underline">
                              Реєстрація
                          </Link>
                      </p>
                  </div>

                  {/* Соціальні кнопки */}
                  <div className="flex gap-4 mb-4">
                      <button
                          onClick={(event) => {
                              event.preventDefault();
                              loginUseGoogle();
                          }}
                          disabled={isGoogleLoading}
                          className="flex items-center justify-center gap-2 bg-white
                         text-gray-700 border border-gray-300 hover:shadow-md
                         transition px-4 py-2 rounded-xl w-full mt-4 font-medium"
                      >
                          {isGoogleLoading ? (
                              <>
                                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                  <span>Авторизація...</span>
                              </>
                          ) : (
                              <>
                                  <FontAwesomeIcon icon={faGoogle} className="text-amber-300 mr-2" />
                                  <span>Увійти через Google</span>
                              </>
                          )}
                      </button>
                  </div>

                  <div className="relative flex items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-slate-400 text-sm">or</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                  </div>


                  {/* Форма */}
                  <form className="space-y-3" onSubmit={handleSubmit}>
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">
                              Email *
                          </label>
                          <input
                              type="email"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300/20  transition"
                              placeholder="email@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                      </div>

                      <div>
                          <div className="flex justify-between mb-2">
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                                  Password *
                              </label>
                              <a href="forgot-password" className="text-sm text-slate-400 hover:text-amber-300 transition">Forgot password?</a>
                          </div>
                          <div className="relative">
                              <input
                                  type={showPassword ? "text" : "password"}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300/20 transition"
                                  placeholder="Your password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
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
                      </div>

                      <button
                          type="submit" disabled={isLoading}
                          className="w-full bg-amber-300 hover:bg-amber-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all duration-200 mt-6 flex justify-center items-center gap-2"
                      >
                          {isLoading ? "Вхід..." : "Увійти"}
                      </button>

                      {error && <p style={{ color: "red" }}>Invalid email or password</p>}
                  </form>
              </div>
          </div>
      </div>
  );
};

export default LoginPage;
