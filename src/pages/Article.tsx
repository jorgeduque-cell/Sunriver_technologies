import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { categories } from '../data/categories';
import ArticleCard from '../components/blog/ArticleCard';
import { useEffect } from 'react';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug) : [];
  const category = article ? categories.find(c => c.id === article.category) : undefined;
  
  useEffect(() => {
    if (!article) {
      navigate('/blog', { replace: true });
    }
    window.scrollTo(0, 0);
  }, [article, navigate]);
  
  if (!article) return null;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const shareUrl = `https://sunriver.solutions/blog/${article.slug}`;
  const shareText = encodeURIComponent(article.title);
  
  // Procesar el contenido markdown-like a HTML
  const renderContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, idx) => {
        // Headers
        if (paragraph.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl font-bold text-sunriver-blue mt-12 mb-6">{paragraph.replace('## ', '')}</h2>;
        }
        if (paragraph.startsWith('### ')) {
          return <h3 key={idx} className="text-xl font-semibold text-gray-800 mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
        }
        
        // Code blocks
        if (paragraph.startsWith('```')) {
          const code = paragraph.replace(/```\w*\n?/, '').replace(/```$/, '');
          return (
            <pre key={idx} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm">
              <code>{code}</code>
            </pre>
          );
        }
        
        // Lists
        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-gray-700">
              {items.map((item, i) => (
                <li key={i}>{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }
        
        // Tables
        if (paragraph.includes('|')) {
          const lines = paragraph.split('\n').filter(line => line.includes('|'));
          if (lines.length < 2) return <p key={idx} className="my-4 text-gray-700 leading-relaxed">{paragraph}</p>;
          
          return (
            <div key={idx} className="overflow-x-auto my-6">
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line, rowIdx) => {
                    const cells = line.split('|').filter(c => c.trim());
                    if (cells.length === 0 || line.includes('---')) return null;
                    return (
                      <tr key={rowIdx} className={rowIdx === 0 ? 'bg-gray-100 font-semibold' : 'border-t'}>
                        {cells.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-3 text-sm">{cell.trim()}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        
        // Blockquotes
        if (paragraph.startsWith('>')) {
          return (
            <blockquote key={idx} className="border-l-4 border-sunriver-orange pl-4 italic my-6 text-gray-600">
              {paragraph.replace('> ', '')}
            </blockquote>
          );
        }
        
        // Regular paragraphs
        return <p key={idx} className="my-4 text-gray-700 leading-relaxed">{paragraph}</p>;
      });
  };

  return (
    <>
      <SEO
        title={article.meta.title}
        description={article.meta.description}
        keywords={article.meta.keywords.join(', ')}
        canonical={`https://sunriver.solutions/blog/${article.slug}`}
      />
      
      {/* Article Header */}
      <article className="pt-24">
        {/* Cover Image */}
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              {/* Back Link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </Link>
              
              {/* Category */}
              {category && (
                <span className={`inline-block px-3 py-1 ${category.color} text-white text-sm font-medium rounded-full mb-4`}>
                  {category.name}
                </span>
              )}
              
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white/30"
                  />
                  <div>
                    <p className="font-medium text-white">{article.author.name}</p>
                    <p className="text-sm">{article.author.role}</p>
                  </div>
                </div>
                
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishDate)}
                </span>
                
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min de lectura
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              {/* Excerpt */}
              <p className="text-xl text-gray-600 font-medium mb-8 border-l-4 border-sunriver-orange pl-6">
                {article.excerpt}
              </p>
              
              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {renderContent(article.content)}
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Compartir:
                </h3>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-[#0077B5] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-[#4267B2] hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{article.author.name}</h3>
                    <p className="text-sm text-sunriver-orange mb-2">{article.author.role}</p>
                    <p className="text-gray-600 text-sm">{article.author.bio}</p>
                    {article.author.linkedin && (
                      <a
                        href={article.author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-sunriver-blue hover:underline mt-2"
                      >
                        <Linkedin className="w-4 h-4" />
                        Sígueme en LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="lg:w-80 space-y-6">
              {/* CTA Servicios */}
              <div className="bg-gradient-to-br from-sunriver-blue to-sunriver-blue/90 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-3">¿Necesitas implementar esto?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Te ayudamos a implementar chatbots IA, automatizaciones y optimización de performance.
                </p>
                <Link
                  to="/contacto"
                  className="block w-full py-3 bg-sunriver-orange text-white text-center font-semibold rounded-full hover:bg-sunriver-orange/90 transition-colors"
                >
                  Agendar consultoría gratis
                </Link>
              </div>
              
              {/* Artículos Relacionados en Sidebar */}
              {relatedArticles.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Otros artículos</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        to={`/blog/${relatedArticle.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={relatedArticle.coverImage}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-sunriver-orange transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {relatedArticle.readTime} min de lectura
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

    </>
  );
};

export default Article;
