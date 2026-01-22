import { useSidebar } from "../../context/SidebarContext.tsx";
import {Helmet} from "react-helmet-async";

const Backdrop: React.FC = () => {
    const { isMobileOpen, toggleMobileSidebar } = useSidebar();

    if (!isMobileOpen) return null;

    return (
        <>
            <Helmet>
                <title>Admin Panel</title>
            </Helmet>
            <div
                className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                onClick={toggleMobileSidebar}
            />
        </>
    );
};

export default Backdrop;
