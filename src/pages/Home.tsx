import { Suspense, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import '../home/home.css';
import '../home/fx.css';
import { Nav } from '../home/Nav';
import { Hero } from '../home/Hero';
import { CaseStudy } from '../home/CaseStudy';
import { Services } from '../home/Services';
import { Guide } from '../home/Guide';
import { Process } from '../home/Process';
import { Contact, Footer, Testimonial, WhatsAppFloat } from '../home/Closing';
import { Faq } from '../home/Faq';
import { useReveal } from '../home/useReveal';
import { IntroScene } from '../home/IntroScene';
import { useCursorGlow, useInteractiveMotion, useScrollSkew } from '../home/motion';

/**
 * Límite de hidratación: el HTML ya viene prerenderizado, y cada sección envuelta se
 * hidrata en su propia pasada (React cede el hilo entre una y otra). Así la carga no
 * genera una sola tarea larga. No cambia nada visible ni el HTML final.
 */
const Island = ({ children }: { children: ReactNode }) => <Suspense fallback={null}>{children}</Suspense>;

// En memoria: se reinicia en cada carga o recarga de la página (la entrada se ve siempre),
// pero no se repite al volver a la home navegando dentro del sitio.
let curtainSeen = false;

// Home de SunRiver. Se prerenderiza en build (scripts/prerender.mjs).
// Meta, canonical y JSON-LD viven en index.html y en src/home/schema.ts.
const Home = () => {
    useReveal();
    useInteractiveMotion();
    useCursorGlow();
    useScrollSkew();

    // La cortina de entrada no se repite al volver a la home dentro del sitio.
    useLayoutEffect(() => {
        if (curtainSeen) {
            document.querySelector('.sr-curtain')?.remove();
            document.querySelector('.sr')?.setAttribute('data-nocurtain', '');
        }
        // Diferido para que el doble efecto de StrictMode (desarrollo) no la quite en la primera carga.
        setTimeout(() => {
            curtainSeen = true;
        }, 0);
    }, []);

    return (
        <div className="sr" id="top">
            <div className="sr-curtain" aria-hidden="true">
                <span className="sr-curtain-panel sr-curtain-panel--t" />
                <span className="sr-curtain-panel sr-curtain-panel--b" />
                <IntroScene />
                <span className="sr-curtain-word">
                    Sun<em>River</em>
                    <small>Solution</small>
                </span>
            </div>
            <div className="sr-progress" aria-hidden="true" />
            <div className="sr-film" aria-hidden="true" />
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
