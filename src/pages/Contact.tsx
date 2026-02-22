import { SEO, LocalBusinessSchema } from '../components/SEO';
import CTA from '../sections/CTA';

const ContactPage = () => {
    return (
        <>
            <SEO
                title="Contacto | SunRiver Solution - Inicia tu Proyecto Web"
                description="Solicita presupuesto para tu página web económica en Colombia. Desarrollo web a bajo costo con IA. WhatsApp +57 312 4183002. Respuesta en 24h."
                keywords="cotizar página web, precio página web Colombia, contacto desarrollo web, presupuesto web económica, página web barata Cali"
                canonical="https://sunriver.solutions/contacto"
                schema={LocalBusinessSchema}
            />
            <div className="min-h-screen bg-sunriver-navy-dark pt-20">
                <CTA />
            </div>
        </>
    );
};

export default ContactPage;
