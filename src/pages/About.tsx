import { SEO, WebPageSchema } from '../components/SEO';
import AboutUs from '../sections/AboutUs';

const AboutPage = () => {
    return (
        <>
            <SEO
                title="Nosotros | SunRiver Solution - Equipo de Desarrollo Web"
                description="Conoce SunRiver Solution. Creamos páginas web económicas y profesionales para PyMEs y emprendedores en Colombia. Tecnología de IA a bajo costo."
                keywords="quiénes somos SunRiver, desarrollo web Colombia, páginas web económicas, empresa diseño web Cali, desarrollo web PyMEs"
                canonical="https://sunriver.solutions/nosotros"
                schema={WebPageSchema(
                    'Nosotros | SunRiver Solution',
                    'Conoce SunRiver Solution. Creamos páginas web económicas y profesionales para PyMEs y emprendedores en Colombia.',
                    'https://sunriver.solutions/nosotros'
                )}
            />
            <div className="pt-20">
                <AboutUs />
            </div>
        </>
    );
};

export default AboutPage;
