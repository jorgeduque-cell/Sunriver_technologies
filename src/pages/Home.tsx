import { SEO, LocalBusinessSchema } from '../components/SEO';
import Hero from '../sections/Hero';
import PainPoints from '../sections/PainPoints';
import Stats from '../sections/Stats';
import Portfolio from '../sections/Portfolio';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import WebDevelopmentWithPurpose from '../sections/WebDevelopmentWithPurpose';
import SEOFAQ from '../sections/SEOFAQ';

const Home = () => {
    return (
        <>
            <SEO
                title="SunRiver Solution | Ingeniería de Software que Transforma Negocios"
                description="Automatización, IA y desarrollo a medida respaldado por código real en GitHub. Software enterprise, bots y agentes cognitivos con resultados medibles."
                keywords="ingeniería de software, automatización, bots, IA, desarrollo web, TypeScript, React, agentes cognitivos, portafolio GitHub"
                canonical="https://sunriver.solutions/"
                schema={LocalBusinessSchema}
            />
            <Hero />
            <PainPoints />
            <Stats />
            <Portfolio />
            <WebDevelopmentWithPurpose />
            <Testimonials />
            <SEOFAQ />
            <CTA />
        </>
    );
};

export default Home;
