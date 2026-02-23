// Tipos para el sistema de blog/artículos

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishDate: string;
  updatedDate?: string;
  readTime: number; // minutos
  category: Category;
  tags: string[];
  coverImage: string;
  meta: MetaSEO;
  featured?: boolean;
  relatedArticles?: string[]; // slugs de artículos relacionados
}

export type Author = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

export type Category = 
  | 'ia'
  | 'desarrollo-web'
  | 'automatizacion'
  | 'seo'
  | 'negocios-digitales'
  | 'tendencias';

export type CategoryInfo = {
  id: Category;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export type MetaSEO = {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export type ArticleFilter = {
  category?: Category;
  tag?: string;
  search?: string;
  featured?: boolean;
}
