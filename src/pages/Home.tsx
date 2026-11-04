import { Suspense, use, useEffect, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import '../home/home.css';
import '../home/fx.css';
import { Nav } from '../home/Nav';
import { Hero } from '../home/Hero';
import { CaseStudy } from '../home/CaseStudy';
import { Services } from '../home/Services';
import { ProjectsRail } from '../home/ProjectsRail';
import { Guide } from '../home/Guide';
import { Process } from '../home/Process';
import { Contact, Footer, Testimonial } from '../home/Closing';
import { Faq } from '../home/Faq';
import { DepthGauge } from '../home/DepthGauge';
import { useReveal } from '../home/useReveal';
import { GuidePopup } from '../home/GuidePopup';
import { IntroScene } from '../home/IntroScene';
import { useAnchorScroll, useCursorGlow, useInteractiveMotion, useScrollSkew } from '../home/motion';
import { gateFor, releaseAll } from '../home/lazyHydrate';

/** Espera (solo durante la hidratación inicial) a que la sección se acerque o la toquen. */
const Gate = ({ selector, children }: { selector: string; children: ReactNode }) => {
    if (typeof window !== 'undefined' && window.__srHydrating) use(gateFor(selector));
    return children;
};

/**
 * Límite de hidratación: el HTML ya viene prerenderizado y cada sección envuelta se activa
 * por separado, cuando se acerca a la pantalla (ver home/lazyHydrate.ts). Así la carga no
 * genera una sola tarea larga. No cambia nada visible ni el HTML final.
 */
const Island = ({ at, children }: { at: string; children: ReactNode }) => (
    <Suspense fallback={null}>
        <Gate selector={at}>{children}</Gate>
    </Suspense>
);

/** Tramo de puro color entre dos zonas: el fondo "desciende" del sol al fondo del río. */
const DepthBand = ({ name }: { name: 'sand-river' | 'river-deep' | 'deep-abyss' | 'abyss-ink' }) => (
  <div className={`sr-depth-band sr-depth-band--${name}`} aria-hidden="true" />
);

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
    useAnchorScroll();

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

    // Al salir de la home se acaba la hidratación inicial: si se vuelve navegando dentro del
    // sitio, las secciones se renderizan de inmediato en vez de esperar.
    useEffect(
        () => () => {
            window.__srHydrating = false;
            releaseAll();
        },
        [],
    );

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
            <div className="sr-film" aria-hidden="true" />
            <a className="sr-skip" href="#contenido">
                Saltar al contenido
            </a>
            <DepthGauge />
            <Nav />
            <main id="contenido" tabIndex={-1}>
                <Hero />
                <Island at="#servicios"><Services /></Island>
                <DepthBand name="sand-river" />
                <Island at="#caso"><CaseStudy /></Island>
                <DepthBand name="river-deep" />
                <Island at="#proyectos"><ProjectsRail /></Island>
                <Island at=".sr-testimonial-section"><Testimonial /></Island>
                <Island at="#proceso"><Process /></Island>
                <DepthBand name="deep-abyss" />
                <Island at="#guia"><Guide /></Island>
                <Island at="#preguntas"><Faq /></Island>
                <DepthBand name="abyss-ink" />
                <Island at="#contacto"><Contact /></Island>
            </main>
            <Island at=".sr-footer"><Footer /></Island>
            <GuidePopup />
        </div>
    );
};

export default Home;
