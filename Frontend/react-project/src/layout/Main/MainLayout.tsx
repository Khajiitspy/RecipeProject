import { Outlet } from "react-router";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import SideBar from "./MainSideBar.tsx";

export const MainLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <SideBar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <MainHeader />

                <main className="flex-1 overflow-y-auto ">
                    <Outlet />
                    <MainFooter />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
