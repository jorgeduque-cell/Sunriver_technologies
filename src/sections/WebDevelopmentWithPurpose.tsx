import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MonitorPlay, Sparkles, TrendingUp, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WebDevelopmentWithPurpose = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in animations
            gsap.fromTo(
                '.dev-animate',
                { opacity: 0, scale: 0.95, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white">
            {/* Background Gradients */}
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sunriver-blue/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 dev-animate">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunriver-orange/10 text-sunriver-orange font-medium text-sm mb-6 border border-sunriver-orange/20">
                        <Sparkles className="w-4 h-4" />
                        <span>Innovación Estratégica</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Desarrollo Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunriver-orange to-sunriver-blue">con Propósito</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Tu página web no debería ser solo una tarjeta de presentación virtual, un gasto o dinero quieto.
                        La transformamos en un <strong className="text-sunriver-blue font-semibold">activo generador de ventas</strong>.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="dev-animate">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-sunriver-orange/10 rounded-xl flex items-center justify-center border border-sunriver-orange/20">
                                    <MonitorPlay className="w-6 h-6 text-sunriver-orange" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">De Gasto a Inversión Monetizable</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Convertimos tú página web estática en una <strong className="text-gray-900">estrategia completa de consecución de ventas</strong>. Implementamos automatizaciones directamente en el sitio para captar y convertir leads 24/7 sin esfuerzo manual.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="dev-animate">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-sunriver-blue/10 rounded-xl flex items-center justify-center border border-sunriver-blue/20">
                                    <Cpu className="w-6 h-6 text-sunriver-blue" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Impulsado por Inteligencia Artificial</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Integramos automatización inteligente en el entorno web para guiar a los usuarios, precalificar clientes potenciales y cerrar oportunidades antes de que tu equipo tenga que intervenir.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="dev-animate">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Máximo Retorno (ROI)</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Una web con propósito es una máquina engrasada orientada a resultados, monetizando tu presencia digital de forma autónoma.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="dev-animate pt-4">
                            <button
                                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold leading-6 text-white whitespace-no-wrap bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 border border-transparent rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                Transformar mi web hoy
                            </button>
                        </div>
                    </div>

                    {/* Visual/Graphic */}
                    <div className="order-1 lg:order-2 dev-animate relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-sunriver-orange/20 to-sunriver-blue/20 blur-3xl rounded-full" />
                        <div className="relative bg-gray-900 rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-800 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
                            {/* Decorative elements */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>

                            <div className="mt-8 space-y-6">
                                <div className="h-4 bg-gray-800 rounded-full w-3/4" />
                                <div className="h-4 bg-gray-800 rounded-full w-full" />
                                <div className="h-4 bg-gray-800 rounded-full w-5/6" />

                                <div className="pt-6 mt-6 border-t border-gray-800">
                                    <div className="flex items-center justify-between p-4 bg-sunriver-blue/10 rounded-xl border border-sunriver-blue/20">
                                        <span className="text-sunriver-blue font-medium">Automatización IA Activa</span>
                                        <span className="flex h-3 w-3 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunriver-blue opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sunriver-blue"></span>
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 pt-4">
                                    <div className="p-4 bg-gray-800 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-white mb-1">24/7</div>
                                        <div className="text-xs text-gray-400">Operación</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WebDevelopmentWithPurpose;
