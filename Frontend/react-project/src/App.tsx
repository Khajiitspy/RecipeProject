import './App.css'
import {Route, Routes} from "react-router";
import MainLayout from "./layout/Main/MainLayout.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";
import UserHomePage from "./pages/user/UserHomePage";
import RegisterPage from "./pages/account/RegisterPage.tsx";
// import CreateRecipePage from './pages/recipe/CreateRecipePage.tsx';
// import RecipePage from './pages/recipe/RecipesPage/index.tsx';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<UserHomePage/>} />
                    <Route path="/register" element={<RegisterPage />} />

                </Route>

                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </>
    )
}

export default App
