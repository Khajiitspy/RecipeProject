import './App.css'
import {Route, Routes} from "react-router";
import MainLayout from "./layout/Main/MainLayout.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";
import UserHomePage from "./pages/user/UserHomePage";
import RegisterPage from "./pages/account/RegisterPage.tsx";
import LoginPage from "./pages/account/LoginPage.tsx";
import RecipeCreatePage from './pages/recipe/RecipeCreatePage.tsx';
import RecipesPage from './pages/recipe/RecipesPage.tsx';
import ForgotPasswordPage from "./pages/account/ForgotPassword/ForgotPasswordPage.tsx";
import EmailSentSuccessPage from "./pages/account/EmailSentSuccess/EmailSentSuccessPage.tsx";
import ResetPasswordPage from "./pages/account/ResetPassword/ResetPasswordPage.tsx";
import RecipeDetailsPage from "./pages/recipe/RecipeDetailsPage.tsx";
import RecipeEditPage from "./pages/recipe/RecipeEditPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<UserHomePage/>} />

                    <Route path="account">
                        <Route  path={"login"} element={<LoginPage/>} />
                        <Route  path={"register"} element={<RegisterPage/>} />

                        <Route  path={"forgot-password"} element={<ForgotPasswordPage/>} />
                        <Route  path={"email-sent-success"} element={<EmailSentSuccessPage/>} />
                        <Route  path={"reset-password"} element={<ResetPasswordPage/>} />
                    </Route>

                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
                    <Route path="/recipes/create" element={<RecipeCreatePage />} />
                    <Route path="/recipes/edit/:id" element={<RecipeEditPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </>
    )
}

export default App
