import { SEO, WebPageSchema } from '../components/SEO';
import Methodology from '../sections/Methodology';
import SOHIFramework from '../sections/SOHIFramework';

const MethodologyPage = () => {
    return (
        <>
            <SEO
                title="Metodología SOHI | Desarrollo Web con Propósito y Resultados"
                description="Conoce nuestra metodología SOHI para crear páginas web económicas que generan resultados. Framework probado para PyMEs y emprendedores en Colombia."
                keywords="metodología desarrollo web, SOHI framework, desarrollo web con propósito, páginas web efectivas, diseño web resultados Colombia"
                canonical="https://sunriver.solutions/metodologia"
                schema={WebPageSchema(
                    'Metodología SOHI | Desarrollo Web con Propósito',
                    'Conoce nuestra metodología SOHI para crear páginas web económicas que generan resultados.',
                    'https://sunriver.solutions/metodologia'
                )}
            />
            <div className="pt-20">
                <Methodology />
                <SOHIFramework />
            </div>
        </>
    );
};

export default MethodologyPage;
