
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductCategoryName } from '../types'; 
import { useAppContext } from '../contexts/AppContext';
import { CartIcon } from './icons'; // TagIcon removed

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useAppContext();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
      <Link to={`/products/${product.id}`} className="block group">
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover" 
            loading="lazy"
          />
           {/* Removed Bestseller/Popular span */}
           <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-[#8F87F1]">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden text-ellipsis line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-bold text-[#8F87F1]">
            ৳{product.price.toLocaleString()}
            {product.category === ProductCategoryName.SUBSCRIPTION && <span className="text-sm font-normal text-gray-500">/month</span>}
          </p>
          {/* Removed TagIcon for bestseller/popular */}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
        >
          <CartIcon className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
