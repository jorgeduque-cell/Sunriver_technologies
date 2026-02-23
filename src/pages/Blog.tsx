import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';
import { articles, getFeaturedArticles, getRecentArticles, getAllTags } from '../data/articles';
import { categories } from '../data/categories';
import ArticleCard from '../components/blog/ArticleCard';
import CategoryFilter from '../components/blog/CategoryFilter';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(6);
  const allTags = getAllTags();
  
  // Filtrar artículos por búsqueda
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return recentArticles;
    
    const query = searchQuery.toLowerCase();
    return articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, recentArticles]);
  
  const featuredArticle = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  return (
    <>
      <SEO
        title="Blog de IA y Desarrollo Web | SunRiver Solution"
        description="Artículos semanales sobre inteligencia artificial aplicada al desarrollo web, automatización, SEO técnico y transformación digital para PyMEs."
        keywords="blog IA, desarrollo web, automatización, chatbots, Core Web Vitals, n8n, SEO técnico"
        canonical="https://sunriver.solutions/blog"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-sunriver-blue/5 via-white to-sunriver-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-orange/10 rounded-full border border-sunriver-orange/20 mb-6">
              <Sparkles className="w-4 h-4 text-sunriver-orange" />
              <span className="text-sm font-medium text-sunriver-orange">
                Conocimiento técnico semanal
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-sunriver-blue mb-6">
              Blog de{' '}
              <span className="text-gradient">IA & Desarrollo</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Artículos prácticos sobre inteligencia artificial aplicada al desarrollo web, 
              automatización de negocios y estrategias de crecimiento digital para PyMEs.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sunriver-orange/30 focus:border-sunriver-orange transition-all shadow-sm"
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-5 h-5 text-sunriver-orange" />
              <span><strong>{articles.length}</strong> artículos publicados</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-5 h-5 text-sunriver-blue" />
              <span>Actualizado semanalmente</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Article */}
      {!searchQuery && featuredArticle && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-sunriver-blue mb-8 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-sunriver-orange" />
              Artículo Destacado
            </h2>
            <ArticleCard article={featuredArticle} featured />
          </div>
        </section>
      )}
      
      {/* Category Filter */}
      <section className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter activeCategory="all" />
        </div>
      </section>
      
      {/* Articles Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-sunriver-blue mb-8">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Artículos Recientes'}
          </h2>
          
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No encontramos artículos para "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-sunriver-orange font-medium hover:underline"
              >
                Ver todos los artículos
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="py-16 bg-sunriver-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Recibe los mejores artículos en tu inbox
          </h2>
          <p className="text-white/80 mb-8">
            Un artículo técnico semanal sobre IA, desarrollo web y automatización. 
            Sin spam, cancela cuando quieras.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-sunriver-orange text-white font-semibold rounded-full hover:bg-sunriver-orange/90 transition-colors"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Blog;
