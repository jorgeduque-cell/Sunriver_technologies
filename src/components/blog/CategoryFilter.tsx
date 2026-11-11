import { categories } from '../../data/categories';
import type { Category } from '../../types/blog';

interface CategoryFilterProps {
  activeCategory?: Category | 'all';
}

const CategoryFilter = ({ activeCategory = 'all' }: CategoryFilterProps) => {
  
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <a
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeCategory === 'all'
            ? 'bg-sunriver-blue text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Todos
      </a>
      
      {categories.map((category) => (
        <a
          key={category.id}
          href={`/blog/categoria/${category.id}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id
              ? `${category.color} text-white shadow-md`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};

export default CategoryFilter;
