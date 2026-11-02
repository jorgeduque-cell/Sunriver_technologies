import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { SEO } from '../components/SEO';
import { articles, getArticlesByCategory } from '../data/articles';
import { categories } from '../data/categories';
import ArticleCard from '../components/blog/ArticleCard';
import CategoryFilter from '../components/blog/CategoryFilter';

const BlogCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find(c => c.id === categoryId);
  const categoryArticles = categoryId ? getArticlesByCategory(categoryId) : [];
  
  if (!category) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
        <Link to="/blog" className="text-sunriver-orange hover:underline">
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${category.name} | Blog SunRiver`}
        description={category.description}
        keywords={`${category.name}, blog, desarrollo web, IA, SunRiver`}
        canonical={`https://www.sunriverstech.com/blog/categoria/${category.id}`}
      />
      
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-sunriver-orange mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${category.color} text-white rounded-full mb-6`}>
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">{category.name}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-sunriver-blue mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {category.description}
          </p>
        </div>
      </section>
      
      {/* Filter */}
      <section className="py-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter activeCategory={category.id} />
        </div>
      </section>
      
      {/* Articles */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 mb-8">
            {categoryArticles.length} artículo{categoryArticles.length !== 1 ? 's' : ''} en esta categoría
          </p>
          
          {categoryArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">
                Aún no hay artículos en esta categoría. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogCategory;
