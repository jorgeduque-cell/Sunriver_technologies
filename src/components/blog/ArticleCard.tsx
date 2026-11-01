import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { Article } from '../../types/blog';
import { categories } from '../../data/categories';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const category = categories.find(c => c.id === article.category);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (featured) {
    return (
      <article className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <Link to={`/blog/${article.slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Imagen */}
            <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
              
              {/* Badge categoría */}
              {category && (
                <span className={`absolute top-4 left-4 px-3 py-1 ${category.color} text-white text-xs font-semibold rounded-full`}>
                  {category.name}
                </span>
              )}
            </div>
            
            {/* Contenido */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{formatDate(article.publishDate)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-sunriver-orange transition-colors">
                {article.title}
              </h2>
              
              <p className="text-gray-600 mb-6 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{article.author.name}</p>
                    <p className="text-sm text-gray-500">{article.author.role}</p>
                  </div>
                </div>
                
                <span className="flex items-center gap-2 text-sunriver-orange font-medium group-hover:gap-3 transition-all">
                  Leer más <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <Link to={`/blog/${article.slug}`} className="block flex flex-col h-full">
        {/* Imagen */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          {/* Badge categoría */}
          {category && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 ${category.color} text-white text-xs font-semibold rounded-full`}>
              {category.name}
            </span>
          )}
        </div>
        
        {/* Contenido */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span>{formatDate(article.publishDate)}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} min
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-sunriver-orange transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {article.excerpt}
          </p>
          
          {/* Autor */}
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-sm font-medium text-gray-700">{article.author.name}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
