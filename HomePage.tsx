
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { PRODUCT_CATEGORIES, WHY_CHOOSE_US_ITEMS, BANNER_IMAGE_URL } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { CategoryIconCard } from '../components/CategoryIconCard';
import { WhyChooseUsCard } from '../components/WhyChooseUsCard';
import { PageTitle } from '../components/PageTitle'; 
import { SwipeArrowIcon } from '../components/icons';

export const HomePage: React.FC = () => {
  const { getProductsByCategory } = useAppContext();
  // const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768; // Not used for rendering logic to avoid hydration issues


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <section className="py-4 md:py-6 px-4 lg:px-8">
        <div className="relative bg-[#8F87F1] h-64 md:h-[400px] flex items-center justify-center text-white overflow-hidden rounded-lg shadow-lg">
          <img 
            src={BANNER_IMAGE_URL} 
            alt="Promotional Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative z-10 text-center p-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">Premium Digital Products</h1>
            <p className="text-lg md:text-xl mb-6 drop-shadow-md">Courses, Software, Subscriptions & E-books</p>
            <Link 
              to="/products"
              className="bg-white text-[#8F87F1] font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-sm md:text-base"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 pb-12">
        {/* Product Categories Section */}
        <section className="mb-10 md:mb-16">
          <PageTitle title="Product Categories" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PRODUCT_CATEGORIES.map(category => (
              <CategoryIconCard key={category.name} category={category} />
            ))}
          </div>
        </section>

        {/* Product Listings Sections */}
        {PRODUCT_CATEGORIES.map(pCategory => {
          const products = getProductsByCategory(pCategory.name).slice(0, 3); 
          
          if (products.length === 0) return null;
          return (
            <section key={pCategory.name} className="mb-10 md:mb-16">
               <PageTitle title={pCategory.name.toUpperCase()}>
                 <Link 
                    to={`/products?category=${encodeURIComponent(pCategory.name)}`}
                    className="text-sm font-medium text-[#8F87F1] hover:text-opacity-80 hover:text-[#8F87F1] transition-colors flex items-center group"
                  >
                    <span>View All</span>
                    <SwipeArrowIcon className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
               </PageTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {products.map((product, index) => (
                  <div key={product.id} className={`${index === 2 ? 'hidden md:block' : 'block'}`}>
                    {/* The div wrapper above handles visibility:
                        - product[0] (index 0) is 'block' (always visible)
                        - product[1] (index 1) is 'block' (always visible)
                        - product[2] (index 2) is 'hidden md:block' (hidden on xs, sm; visible on md+)
                        This ensures max 2 products on <md screens, and max 3 on md+ screens.
                    */}
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Why Choose Us Section */}
        <section className="mb-8 md:mb-12">
          <PageTitle title="Why Choose Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {WHY_CHOOSE_US_ITEMS.map(item => (
              <WhyChooseUsCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
