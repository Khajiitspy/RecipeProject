import { Outlet } from "react-router";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import SideBar from "./SideBar.tsx";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-secondary-soft">
            <MainHeader />

            <main className="flex flex-1 gap-6 bg-gray-50 ">
                <SideBar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>

            <MainFooter />
        </div>
    );
};

export default MainLayout;
