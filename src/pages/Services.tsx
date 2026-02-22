import { SEO, ServiceSchema } from '../components/SEO';
import Services from '../sections/Services';
import CTA from '../sections/CTA';

const ServicesPage = () => {
    return (
        <>
            <SEO
                title="Servicios | SunRiver Solution - Soluciones Web con Propósito"
                description="Servicios de desarrollo web a bajo costo en Colombia. Páginas web baratas pero profesionales para PyMEs y emprendedores. Chatbots con IA incluidos."
                keywords="servicios web económicos, páginas web baratas Colombia, diseño web a bajo costo, desarrollo web PyMEs, automatización IA negocios"
                canonical="https://sunriver.solutions/servicios"
                schema={ServiceSchema}
            />
            <div className="pt-20">
                <Services />
                <CTA />
            </div>
        </>
    );
};

export default ServicesPage;
