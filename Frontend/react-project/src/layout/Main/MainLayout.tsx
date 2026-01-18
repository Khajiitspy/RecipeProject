import { Outlet } from "react-router";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import {useState} from "react";
import MainSideBar from "./MainSideBar.tsx";

export const MainLayout = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    const closeMobileMenu = () => setIsMobileOpen(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <MainSideBar isMobileOpen={isMobileOpen} closeMobileMenu={closeMobileMenu}/>

            <div className="flex-1 flex flex-col overflow-hidden">
                <MainHeader toggleMobileMenu={toggleMobileMenu}/>

                {isMobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    ></div>
                )}

                <main className="flex-1 overflow-y-auto flex flex-col">
                    <Outlet />
                    <MainFooter />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
