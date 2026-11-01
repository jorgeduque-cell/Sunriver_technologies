import type { LucideIcon } from 'lucide-react';
import { Code2, Server, Bot, Layers, Brain, Cloud } from 'lucide-react';

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend & UI',
    icon: Code2,
    color: 'from-sunriver-orange to-amber-500',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP', 'Radix UI', 'Responsive Design'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: Server,
    color: 'from-blue-500 to-blue-600',
    skills: ['Node.js', 'Express', 'REST APIs', 'Prisma ORM', 'PostgreSQL', 'Zod Validation'],
  },
  {
    id: 'automation',
    title: 'Automatización & Bots',
    icon: Bot,
    color: 'from-emerald-500 to-teal-600',
    skills: ['Web Scraping', 'Telegram Bots', 'PM2', 'Cron Jobs', 'WhatsApp API', 'N8N Workflows'],
  },
  {
    id: 'enterprise',
    title: 'Enterprise & DevOps',
    icon: Layers,
    color: 'from-purple-500 to-purple-600',
    skills: ['Docker', 'VPS Management', 'Vercel', 'CI/CD', 'Monorepos', 'Git'],
  },
  {
    id: 'ai',
    title: 'IA & Agentes Cognitivos',
    icon: Brain,
    color: 'from-rose-500 to-pink-600',
    skills: ['Chatbots IA', 'NLP', 'Agentes Autónomos', 'Framework SOHI', 'Prompt Engineering'],
  },
  {
    id: 'integrations',
    title: 'Integraciones & Cloud',
    icon: Cloud,
    color: 'from-cyan-500 to-sky-600',
    skills: ['Pasarelas de Pago', 'CRM', 'ERP', 'Calendly', 'Google APIs', 'Email Automation'],
  },
];

export const coreTechnologies = [
  { name: 'TypeScript', percentage: 96, description: 'Lenguaje principal en todos los proyectos' },
  { name: 'React', percentage: 90, description: 'Framework frontend de elección' },
  { name: 'Node.js', percentage: 88, description: 'Runtime para backend y bots' },
  { name: 'Docker', percentage: 75, description: 'Containerización enterprise' },
] as const;
