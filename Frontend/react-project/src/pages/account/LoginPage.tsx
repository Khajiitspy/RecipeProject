import { useState } from "react";
import { useLoginMutation } from "../../api/userService";
import {Link} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import foodImage from "../../assets/food.jpg";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

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

  return (
    /*<form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>Invalid email or password</p>}
    </form>*/



      <div className="flex min-h-screen bg-white">
          {/* ЛІВА ЧАСТИНА: Привітання (ховається на мобільних) */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20 relative overflow-hidden min-h-screen">

              {/* 1. Зображення як фон */}
              {/* absolute inset-0 розтягує картинку на весь батьківський блок */}
              <img
                  src={foodImage}
                  alt="Cooking Illustration"
                  className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 2. Шар затемнення (Overlay) */}
              {/* Це важливо, щоб текст залишався читабельним на фоні фото */}
              <div className="absolute inset-0 bg-amber-50/40 backdrop-blur-[4px]"></div>

              {/* 3. Контент (Текст) */}
              {/* relative та z-10 піднімають текст над зображенням */}
              <div className="relative z-10 max-w-md">
                  <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                      Welcome to <span className="text-amber-300">EatLog</span>!
                  </h1>
                  <p className="text-xl text-gray-800 mb-10 leading-relaxed">
                      Sign in to create your own recipes and personalize your cooking adventure.
                  </p>
              </div>

          </div>

          {/* ПРАВА ЧАСТИНА: Форма входу */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 lg:px-32">
              <div className="max-w-md w-full mx-auto">
                  <div className="mb-10 text-center lg:text-left">
                      <h2 className="text-3xl font-bold text-slate-900">Login</h2>
                      <p className="text-slate-500 mt-2">
                          Don't have an account? {" "}
                          <Link to="/register" className="text-amber-300 font-semibold hover:underline">
                              Sign up
                          </Link>
                      </p>
                  </div>

                  {/* Соціальні кнопки */}
                  <div className="flex gap-4 mb-8">
                      <button
                          onClick={(event) => {
                              event.preventDefault();
                              //loginUseGoogle();
                          }}
                          className="flex items-center justify-center gap-2 bg-white
                         text-gray-700 border border-gray-300 hover:shadow-md
                         transition px-4 py-2 rounded-xl w-full mt-4 font-medium"
                      >
                          <FontAwesomeIcon icon={faGoogle} className="text-amber-300" />
                          Log in with Google
                      </button>
                  </div>

                  <div className="relative flex items-center mb-8">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-slate-400 text-sm">or</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                  </div>


                  {/* Форма */}
                  <form className="space-y-6" onSubmit={handleSubmit}>
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
                              <a href="#" className="text-sm text-slate-400 hover:text-amber-300 transition">Forgot password?</a>
                          </div>
                          <div className="relative">
                              <input
                                  type="password"
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300/20 transition"
                                  placeholder="Your password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                              />
                              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                  <FontAwesomeIcon icon={faEyeSlash} />
                              </button>
                          </div>
                      </div>

                      <button
                          type="submit" disabled={isLoading}
                          className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                      >
                          {isLoading ? "Logging in..." : "Login"}
                      </button>



                      {error && <p style={{ color: "red" }}>Invalid email or password</p>}
                  </form>
              </div>
          </div>
      </div>



  );
};

export default LoginPage;
