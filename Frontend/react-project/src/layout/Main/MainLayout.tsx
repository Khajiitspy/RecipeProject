import { Outlet } from "react-router";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-secondary-soft">
            <MainHeader />

            <main className="flex-1">
                <Outlet />
            </main>

            <MainFooter />
        </div>
    );
};

export default MainLayout;
