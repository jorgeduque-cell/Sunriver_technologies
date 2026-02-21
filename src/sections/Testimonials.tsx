import { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Pasamos de 50 a 500 leads mensuales sin contratar más gente. SunRiver transformó completamente nuestra operación de ventas.',
    author: 'Carlos M.',
    role: 'CEO',
    company: 'PyP Liquors',
    avatar: 'CM',
    rating: 5,
    color: 'from-blue-500 to-blue-600',
  },
  {
    quote: 'Nuestros procesos operan solos. Yo solo reviso los dashboards. Es como tener un equipo trabajando 24/7 sin descanso.',
    author: 'Ana L.',
    role: 'Directora Operativa',
    company: 'JD Trading Oil SAS',
    avatar: 'AL',
    rating: 5,
    color: 'from-purple-500 to-purple-600',
  },
  {
    quote: 'La inversión se pagó en 3 meses con el tiempo ahorrado. Ahora podemos enfocarnos en estrategia en lugar de tareas repetitivas.',
    author: 'Roberto K.',
    role: 'Fundador',
    company: 'Venco Oil SAS',
    avatar: 'RK',
    rating: 5,
    color: 'from-green-500 to-green-600',
  },
  {
    quote: 'El framework SOHI nos ayudó a entender exactamente dónde estábamos y el camino para llegar al siguiente nivel.',
    author: 'María P.',
    role: 'COO',
    company: 'Eventos Deportivos 90+1',
    avatar: 'MP',
    rating: 5,
    color: 'from-orange-500 to-orange-600',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);

    // Auto-play
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      }
    }, 5000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-carousel',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gray-50 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sunriver-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunriver-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-blue/10 rounded-full border border-sunriver-blue/20 mb-6">
            <Quote className="w-4 h-4 text-sunriver-blue" />
            <span className="text-sm font-medium text-sunriver-blue">
              Testimonios
            </span>
          </div>
          <h2 className="testimonials-title text-4xl sm:text-5xl font-bold text-sunriver-blue mb-4 opacity-0">
            Lo que dicen nuestros <span className="text-gradient">clientes</span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonial-carousel relative max-w-5xl mx-auto opacity-0">

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 sm:pl-8">
                  <div className="relative bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 h-full mx-auto max-w-4xl">
                    {/* Quote Icon */}
                    <div className="absolute top-8 right-8 opacity-10">
                      <Quote className="w-24 h-24 text-sunriver-blue" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-sunriver-orange text-sunriver-orange" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl sm:text-2xl text-sunriver-blue font-medium leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-sunriver-blue">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-gray-500">
                            {testimonial.role} · {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110 text-sunriver-blue hover:text-sunriver-orange"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                      ? 'bg-sunriver-orange w-8'
                      : 'bg-gray-300 w-2.5 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110 text-sunriver-blue hover:text-sunriver-orange"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-20">
          <p className="text-center text-sm text-gray-500 mb-8">
            Empresas que confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['PyP Liquors', 'JD Trading Oil SAS', 'Venco Oil SAS', 'Eventos Deportivos 90+1'].map((company, i) => (
              <div
                key={i}
                className="text-xl font-bold text-gray-400 hover:text-sunriver-blue transition-colors cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
