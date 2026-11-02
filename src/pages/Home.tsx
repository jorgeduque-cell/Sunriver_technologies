import { Suspense } from 'react';
import type { ReactNode } from 'react';
import '../home/home.css';
import { Nav } from '../home/Nav';
import { Hero } from '../home/Hero';
import { CaseStudy } from '../home/CaseStudy';
import { Services } from '../home/Services';
import { Guide } from '../home/Guide';
import { Process } from '../home/Process';
import { Contact, Footer, Testimonial, WhatsAppFloat } from '../home/Closing';
import { Faq } from '../home/Faq';
import { useReveal } from '../home/useReveal';
import { useInteractiveMotion } from '../home/motion';

/**
 * Límite de hidratación: el HTML ya viene prerenderizado, y cada sección envuelta se
 * hidrata en su propia pasada (React cede el hilo entre una y otra). Así la carga no
 * genera una sola tarea larga. No cambia nada visible ni el HTML final.
 */
const Island = ({ children }: { children: ReactNode }) => <Suspense fallback={null}>{children}</Suspense>;

// Home de SunRiver. Se prerenderiza en build (scripts/prerender.mjs).
// Meta, canonical y JSON-LD viven en index.html y en src/home/schema.ts.
const Home = () => {
    useReveal();
    useInteractiveMotion();

    return (
        <div className="sr" id="top">
            <a className="sr-skip" href="#contenido">
                Saltar al contenido
            </a>
            <Nav />
            <main id="contenido" tabIndex={-1}>
                <Hero />
                <Island><CaseStudy /></Island>
                <Island><Services /></Island>
                <Island><Guide /></Island>
                <Island><Process /></Island>
                <Island><Testimonial /></Island>
                <Island><Faq /></Island>
                <Island><Contact /></Island>
            </main>
            <Island><Footer /></Island>
            <WhatsAppFloat />
        </div>
    );
};

export default Home;
