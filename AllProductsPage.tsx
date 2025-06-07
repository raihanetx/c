import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Product, ProductCategoryName } from '../types';
import { PRODUCT_CATEGORIES } from '../constants';
import { PageTitle } from '../components/PageTitle';
import { SearchIcon, ChevronDownIcon } from '../components/icons';

export const AllProductsPage: React.FC = () => {
  const { products, searchTerm } = useAppContext();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') as ProductCategoryName | null;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryName | 'all'>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'default'>('default');

  const filteredAndSortedProducts = useMemo(() => {
    let Rproducts = [...products];

    if (selectedCategory !== 'all') {
      Rproducts = Rproducts.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      Rproducts = Rproducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (sortBy) {
        case 'name_asc':
            Rproducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name_desc':
            Rproducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price_asc':
            Rproducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            Rproducts.sort((a, b) => b.price - a.price);
            break;
        case 'default':
        default:
            break;
    }

    return Rproducts;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 min-h-screen">
      <PageTitle title="All Products" subtitle={`Browse our collection of ${filteredAndSortedProducts.length} premium digital products.`} />

      <div className="mb-8 p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Category</label> {/* text-slate-700 to text-gray-700 */}
          <div className="relative">
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategoryName | 'all')}
              className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#8F87F1] focus:border-[#8F87F1] sm:text-sm rounded-md shadow-sm appearance-none" // border-slate-300 to border-gray-300
            >
              <option value="all">All Categories</option>
              {PRODUCT_CATEGORIES.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" /> {/* text-slate-400 to text-gray-400 */}
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label> {/* text-slate-700 to text-gray-700 */}
           <div className="relative">
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#8F87F1] focus:border-[#8F87F1] sm:text-sm rounded-md shadow-sm appearance-none" // border-slate-300 to border-gray-300
            >
              <option value="default">Default</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" /> {/* text-slate-400 to text-gray-400 */}
          </div>
        </div>
      </div>
      
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" /> {/* text-slate-400 to text-gray-400 */}
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3> {/* text-slate-700 to text-gray-700 */}
          <p className="text-gray-500"> {/* text-slate-500 to text-gray-500 */}
            {searchTerm ? `Your search for "${searchTerm}" did not match any products.` : `There are no products matching the current filters.`}
          </p>
          {searchTerm && 
            <button 
              onClick={() => {setSelectedCategory('all'); }} 
              className="mt-4 px-4 py-2 bg-[#8F87F1] text-white rounded-md hover:bg-opacity-90 hover:bg-[#8F87F1] transition" // hover:bg-[#7c71d0] to hover:bg-opacity-90 hover:bg-[#8F87F1]
            >
              Clear Search & Filters
            </button>
          }
        </div>
      )}
    </div>
  );
};