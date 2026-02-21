import Hero from '../sections/Hero';
import PainPoints from '../sections/PainPoints';
import Stats from '../sections/Stats';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import WebDevelopmentWithPurpose from '../sections/WebDevelopmentWithPurpose';

const Home = () => {
    return (
        <>
            <Hero />
            <PainPoints />
            <Stats />
            <WebDevelopmentWithPurpose />
            <Testimonials />
            <CTA />
        </>
    );
};

export default Home;
