import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Target, Rocket, Zap, Globe, Brain, Palette, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        icon: Globe,
        title: 'Accesible para todos',
        description: 'Creemos que toda empresa merece una presencia digital profesional, sin importar su tamaño ni presupuesto.',
        color: 'text-sunriver-orange',
        bg: 'bg-sunriver-orange/10',
    },
    {
        icon: Brain,
        title: 'IA con alma',
        description: 'La inteligencia artificial no reemplaza al humano — lo potencia. Cada automatización tiene un propósito claro.',
        color: 'text-sunriver-blue',
        bg: 'bg-sunriver-blue/10',
    },
    {
        icon: Palette,
        title: 'Diseño que enamora',
        description: 'Cada pixel cuenta. Creamos experiencias visuales que generan confianza desde el primer segundo.',
        color: 'text-purple-600',
        bg: 'bg-purple-100',
    },
    {
        icon: BarChart3,
        title: 'Resultados medibles',
        description: 'No entregamos solo páginas web — entregamos herramientas de crecimiento con métricas reales.',
        color: 'text-green-600',
        bg: 'bg-green-100',
    },
];

const AboutUs = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-animate',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sunriver-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sunriver-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20 about-animate">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-blue/10 rounded-full border border-sunriver-blue/20 mb-6">
                        <Users className="w-4 h-4 text-sunriver-blue" />
                        <span className="text-sm font-medium text-sunriver-blue">Quiénes Somos</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Una firma que cree en el{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunriver-orange to-sunriver-blue">
                            poder digital
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        No somos una agencia más. Somos la firma tecnológica que convierte tu visión en una{' '}
                        <span className="font-semibold text-sunriver-orange">página web con propósito</span>,
                        impulsada por automatización e inteligencia artificial.
                    </p>
                </div>

                {/* Content grid */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Who We Are */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 about-animate relative group hover:border-sunriver-blue/30 transition-colors">
                        <div className="w-14 h-14 bg-sunriver-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users className="w-7 h-7 text-sunriver-blue" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Esencia</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            <strong className="text-gray-900">SunRiver Solution</strong> nació con un sueño simple pero poderoso:
                            que cada emprendedor, cada PyME, cada soñador con un negocio pueda tener una{' '}
                            <span className="text-sunriver-orange font-semibold">presencia web ultra profesional</span>{' '}
                            sin que su bolsillo sufra. Combinamos diseño de clase mundial con tecnología de automatización
                            para que tu negocio trabaje mientras tú descansas.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 about-animate relative group hover:border-sunriver-orange/30 transition-colors">
                        <div className="w-14 h-14 bg-sunriver-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Target className="w-7 h-7 text-sunriver-orange" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Democratizar el acceso a tecnología web de alto nivel. Creemos que una página web no es un lujo —
                            es una <span className="text-sunriver-blue font-semibold">herramienta de crecimiento</span>.
                            Por eso diseñamos sitios que no solo se ven increíbles, sino que trabajan por ti:{' '}
                            <strong className="text-gray-900">capturan leads, automatizan respuestas y convierten visitantes en clientes</strong>,
                            las 24 horas del día.
                        </p>
                    </div>

                    {/* Web Dev con Proposito - Full Width Banner */}
                    <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl about-animate relative overflow-hidden group">
                        {/* Glow effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sunriver-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-sunriver-orange/30 transition-colors" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sunriver-blue/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/2 group-hover:bg-sunriver-blue/30 transition-colors" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start lg:items-center gap-8 lg:gap-12">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                                    <Rocket className="w-10 h-10 text-white" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Desarrollo Web con Propósito
                                </h2>
                                <p className="text-gray-300 leading-relaxed text-lg lg:text-xl mb-6">
                                    No creamos páginas web genéricas. Cada proyecto que tocamos tiene{' '}
                                    <span className="text-white font-medium italic">
                                        "un propósito claro: hacer crecer tu negocio"
                                    </span>.
                                    Integramos IA, automatización de leads y diseño premium para que tu sitio web sea tu mejor vendedor.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    Desde chatbots inteligentes hasta formularios que se conectan directo a tu CRM,
                                    pasando por páginas que cargan en menos de 2 segundos —{' '}
                                    <strong className="text-white">tu web con propósito lo tiene todo.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-12 about-animate">Lo que nos mueve</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => {
                            const Icon = value.icon;
                            return (
                                <div key={i} className="about-animate bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className={`w-12 h-12 ${value.bg} rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className={`w-6 h-6 ${value.color}`} />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Floating Lema Bottom */}
                <div className="mt-20 text-center about-animate">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
                        <Zap className="w-5 h-5 text-sunriver-orange" />
                        <span className="font-bold text-gray-900">Nuestro lema:</span>
                        <span className="text-gray-600 italic">"Tu negocio merece brillar en internet"</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;
