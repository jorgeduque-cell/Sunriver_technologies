import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import ChatBotLazy from '../ChatBotLazy';

// Estilos globales del sitio anterior (Tailwind + utilidades). Solo se cargan
// en las páginas internas; la home nueva usa src/home/home.css.
import '../../index.css';
import '../../App.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
});

const MainLayout = () => {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    }, [pathname]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Suspense fallback={<div className="min-h-[60vh]" />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
            <ChatBotLazy />
            <Toaster position="top-right" richColors theme="light" />
        </div>
    );
};

export default MainLayout;
