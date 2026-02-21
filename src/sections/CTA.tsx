import { useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MessageCircle, Sparkles, Send, Mail, Phone, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lazy load ContactForm to save bundle size
const ContactForm = lazy(() => import('../components/ContactForm'));

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left content
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate right card
      gsap.fromTo(
        '.cta-card',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative py-24 bg-sunriver-navy-dark overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sunriver-blue/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-sunriver-orange/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sunriver-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sunriver-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Value Prop */}
          <div className="cta-content space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-sunriver-orange" />
              <span className="text-sm font-medium text-white">
                Auditoría 100% Gratis
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              ¿Listo para{' '}
              <span className="text-gradient">despegar?</span>
            </h2>

            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Descubre tu nivel SOHI y el camino al Nivel 5.
              Sin compromiso, sin costo inicial. Solo resultados.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
              {['Diagnóstico en 30 min', 'Roadmap personalizado', 'Sin costo inicial'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {item}
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <h3 className="text-white font-semibold mb-4">Contacto Directo</h3>

              <a href="mailto:jorge_duque@sunriver.cloud" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sunriver-orange/20 transition-colors">
                  <Mail className="w-5 h-5 group-hover:text-sunriver-orange transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">jorge_duque@sunriver.cloud</p>
                </div>
              </a>

              <a href="https://wa.me/573124183002" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <p className="font-medium">+57 312 4183002</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Representante</p>
                  <p className="font-medium">Jorge Duque</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Card */}
          <div className="cta-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl">
            <Tabs defaultValue="message" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/20 p-1 rounded-2xl mb-2">
                <TabsTrigger value="message" className="rounded-xl data-[state=active]:bg-sunriver-orange data-[state=active]:text-white text-gray-400 py-3">
                  <Send className="w-4 h-4 mr-2" />
                  Escribirnos
                </TabsTrigger>
                <TabsTrigger value="calendar" className="rounded-xl data-[state=active]:bg-sunriver-blue data-[state=active]:text-white text-gray-400 py-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar
                </TabsTrigger>
              </TabsList>

              <div className="bg-black/20 rounded-2xl p-4 sm:p-6 border border-white/5 min-h-[500px]">
                <TabsContent value="message" className="mt-0 focus-visible:outline-none">
                  <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-sunriver-orange border-t-transparent rounded-full animate-spin" /></div>}>
                    <ContactForm />
                  </Suspense>
                </TabsContent>

                <TabsContent value="calendar" className="mt-0 focus-visible:outline-none h-full">
                  <iframe
                    src="https://calendly.com/jorge_duque-sunriver/30min?hide_gdpr_banner=1&background_color=1e293b&text_color=ffffff&primary_color=f5a623"
                    width="100%"
                    height="500"
                    frameBorder="0"
                    title="Agendar Auditoría"
                    className="w-full h-[500px] rounded-xl bg-white/5"
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
