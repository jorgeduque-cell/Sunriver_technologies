import '../lib/gsap-setup';
import Services from '../sections/Services';
import CTA from '../sections/CTA';

const ServicesPage = () => {
    return (
        <>
            <div className="pt-20">
                <Services />
                <CTA />
            </div>
        </>
    );
};

export default ServicesPage;
