import './App.css'
import {Route, Routes} from "react-router";
import MainLayout from "./layout/Main/MainLayout.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";
import UserHomePage from "./pages/user/UserHomePage";
import RegisterPage from "./pages/account/RegisterPage.tsx";
import LoginPage from "./pages/account/LoginPage.tsx";
import RecipeCreatePage from './pages/recipe/RecipeCreatePage.tsx';
import RecipesPage from './pages/recipe/RecipesPage.tsx';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<UserHomePage/>} />
                    <Route path="/account/register" element={<RegisterPage />} />
                    <Route path="/account/login" element={<LoginPage />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/recipes/create" element={<RecipeCreatePage />} />
                </Route>

                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </>
    )
}

export default App
