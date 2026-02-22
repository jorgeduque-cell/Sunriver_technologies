import { SEO, LocalBusinessSchema } from '../components/SEO';
import Hero from '../sections/Hero';
import PainPoints from '../sections/PainPoints';
import Stats from '../sections/Stats';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import WebDevelopmentWithPurpose from '../sections/WebDevelopmentWithPurpose';
import SEOFAQ from '../sections/SEOFAQ';

const Home = () => {
    return (
        <>
            <SEO
                title="SunRiver Solution | Desarrollo Web con Propósito"
                description="Websites profesionales impulsados por IA que transforman tu negocio en una máquina de crecimiento. Soluciones de alta ingeniería, precios accesibles."
                keywords="desarrollo web, páginas web profesionales, transformación digital, IA para negocios, websites con propósito"
                canonical="https://sunriver.solutions/"
                schema={LocalBusinessSchema}
            />
            <Hero />
            <PainPoints />
            <Stats />
            <WebDevelopmentWithPurpose />
            <Testimonials />
            <SEOFAQ />
            <CTA />
        </>
    );
};

export default Home;
