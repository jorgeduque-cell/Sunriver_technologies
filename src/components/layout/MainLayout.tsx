import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import ChatBotLazy from '../ChatBotLazy';
import { Toaster } from 'sonner';

const MainLayout = () => {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <ChatBotLazy />
            <Toaster position="top-right" richColors theme="light" />
        </div>
    );
};

export default MainLayout;
