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

// Home de SunRiver. Se prerenderiza en build (scripts/prerender.mjs).
// Meta, canonical y JSON-LD viven en index.html y en src/home/schema.ts.
const Home = () => {
    useReveal();

    return (
        <div className="sr" id="top">
            <a className="sr-skip" href="#contenido">
                Saltar al contenido
            </a>
            <Nav />
            <main id="contenido" tabIndex={-1}>
                <Hero />
                <CaseStudy />
                <Services />
                <Guide />
                <Process />
                <Testimonial />
                <Faq />
                <Contact />
            </main>
            <Footer />
            <WhatsAppFloat />
        </div>
    );
};

export default Home;
