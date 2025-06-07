import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCategory } from '../types';

interface CategoryIconCardProps {
  category: ProductCategory;
}

export const CategoryIconCard: React.FC<CategoryIconCardProps> = ({ category }) => {
  const IconComponent = category.icon;
  return (
    <Link 
      to={`/products?category=${encodeURIComponent(category.name)}`} 
      className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center text-center"
    >
      <div className="mb-4 p-4 bg-[#8F87F1]/20 rounded-full group-hover:bg-[#8F87F1] transition-colors duration-300">
        <IconComponent className="h-10 w-10 text-[#8F87F1] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 group-hover:text-[#8F87F1] mb-1 transition-colors duration-300"> {/* text-slate-700 to text-gray-700 */}
        {category.name}
      </h3>
      <p className="text-xs text-gray-500 group-hover:text-[#8F87F1] transition-colors duration-300"> {/* text-slate-500 to text-gray-500 */}
        {category.countLabel}
      </p>
    </Link>
  );
};