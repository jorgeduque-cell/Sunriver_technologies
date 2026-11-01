import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react';
import { projects, projectCategories, type Project } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }: { project: Project }) => {
  const Icon = project.icon;

  return (
    <div
      className={`portfolio-card group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl opacity-0`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Top gradient bar */}
      <div className={`h-2 bg-gradient-to-r ${project.color}`} />

      {/* Hover Gradient Border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 p-[2px]`}
      >
        <div className="w-full h-full bg-white rounded-2xl" />
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          {/* Category badge */}
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${project.color} text-white`}
          >
            {project.category === 'automation'
              ? 'Automatización'
              : project.category === 'web'
                ? 'Desarrollo Web'
                : 'Plataforma'}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-sunriver-blue mb-1 group-hover:text-sunriver-orange transition-colors">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-gray-500 mb-4">{project.subtitle}</p>
        <p className="text-gray-600 mb-6 leading-relaxed text-sm">{project.description}</p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-sunriver-orange/10 group-hover:text-sunriver-orange transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 text-gray-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center p-2 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
              <div className="text-sm font-bold text-sunriver-blue">{metric.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${project.color} text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
          >
            <Github className="w-4 h-4" />
            Ver Código
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Corner Decoration */}
      <div className="absolute top-2 right-0 w-24 h-24 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
        <div
          className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${project.color} opacity-20 rotate-45`}
        />
      </div>
    </div>
  );
};

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.portfolio-title',
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.portfolio-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="portafolio"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A5F 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sunriver-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunriver-blue/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-orange/10 rounded-full border border-sunriver-orange/20 mb-6">
            <Sparkles className="w-4 h-4 text-sunriver-orange" />
            <span className="text-sm font-medium text-sunriver-orange">
              Portafolio Verificable
            </span>
          </div>
          <h2 className="portfolio-title text-4xl sm:text-5xl font-bold text-sunriver-blue mb-4 opacity-0">
            Proyectos <span className="text-gradient">Reales</span>
          </h2>
          <p className="portfolio-title text-gray-600 text-lg max-w-2xl mx-auto opacity-0">
            Código abierto, resultados medibles. Cada proyecto es verificable directamente en GitHub.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-sunriver-orange/40 hover:text-sunriver-orange'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom GitHub CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/jorgeduque-cell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Github className="w-5 h-5" />
            Ver todo mi GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
