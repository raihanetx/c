
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Product, ProductCategoryName } from '../types';
import { 
  CartIcon, TagIcon, ArrowLeftIcon, InfoIcon, BookOpenIcon, CheckCircleIcon, 
  AcademicCapIcon, DesktopComputerIcon, SparklesIcon, CalendarDaysIcon 
} from '../components/icons';
import { ProductCard } from '../components/ProductCard';

interface DetailSectionProps {
  title: string;
  icon: React.FC<{className?: string}>;
  children: React.ReactNode;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, icon: Icon, children }) => (
  <div className="py-6 border-b border-gray-200 last:border-b-0">
    <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
      <Icon className="h-6 w-6 mr-2 text-[#8F87F1]" />
      {title}
    </h3>
    <div className="prose prose-gray max-w-none text-gray-600">
      {children}
    </div>
  </div>
);


export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, addToCart, getProductsByCategory } = useAppContext();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 3); // Show up to 3 related products
        setRelatedProducts(related);
      } else {
        navigate('/404'); 
      }
    }
     window.scrollTo(0, 0);
  }, [id, getProductById, getProductsByCategory, navigate]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-12 text-center min-h-screen">
        <div className="animate-pulse">
          <div className="mb-6 h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div> 
                <div className="w-full h-96 bg-gray-200 rounded-lg shadow-md"></div>
              </div>
              <div> 
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 bg-gray-200 rounded-md w-32"></div>
                  <div className="h-12 bg-gray-300 rounded-lg flex-grow"></div>
                </div>
                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Consider a more subtle notification like a toast
    alert(`${product.name} (x${quantity}) added to cart!`);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };
  
  const renderCategorySpecificDetails = () => {
    switch (product.category) {
      case ProductCategoryName.COURSE:
        return (
          <>
            <DetailSection title="What You'll Learn" icon={AcademicCapIcon}>
              <ul>
                <li>Placeholder: Master the fundamentals of {product.name}.</li>
                <li>Placeholder: Gain practical skills through hands-on examples.</li>
                <li>Placeholder: Understand advanced concepts and best practices.</li>
                <li>Placeholder: Be able to apply your knowledge to real-world projects.</li>
              </ul>
            </DetailSection>
            <DetailSection title="Course Content" icon={BookOpenIcon}>
              <p>Placeholder: This course is structured into several modules, covering topics from beginner to advanced levels. Each module includes video lessons, reading materials, and quizzes.</p>
              <ol>
                <li>Module 1: Introduction to {product.category}</li>
                <li>Module 2: Core Concepts</li>
                <li>Module 3: Advanced Techniques</li>
                <li>Module 4: Project Work & Case Studies</li>
              </ol>
            </DetailSection>
          </>
        );
      case ProductCategoryName.EBOOK:
        return (
          <>
            <DetailSection title="Key Topics Covered" icon={BookOpenIcon}>
              <ul>
                <li>Placeholder: In-depth analysis of key subject matter.</li>
                <li>Placeholder: Practical examples and case studies.</li>
                <li>Placeholder: Actionable insights and strategies.</li>
              </ul>
            </DetailSection>
            <DetailSection title="Format & Details" icon={InfoIcon}>
              <p>Placeholder: This e-book is available in PDF and EPUB formats. Approximately 150-250 pages of rich content. Instant download after purchase.</p>
            </DetailSection>
          </>
        );
      case ProductCategoryName.SOFTWARE:
        return (
          <>
            <DetailSection title="Core Features" icon={SparklesIcon}>
              <ul>
                <li>Placeholder: Powerful feature set for {product.name.toLowerCase()}.</li>
                <li>Placeholder: Intuitive user interface and seamless workflow.</li>
                <li>Placeholder: Regular updates and improvements.</li>
                <li>Placeholder: Cross-platform compatibility (if applicable).</li>
              </ul>
            </DetailSection>
            <DetailSection title="System Requirements" icon={DesktopComputerIcon}>
              <p>Placeholder: Compatible with Windows 10/11, macOS 12+. Requires at least 8GB RAM and 5GB disk space. Internet connection may be required for activation/updates.</p>
            </DetailSection>
          </>
        );
      case ProductCategoryName.SUBSCRIPTION:
        return (
          <>
            <DetailSection title="Subscription Benefits" icon={CheckCircleIcon}>
              <ul>
                <li>Placeholder: Access to exclusive premium content/features.</li>
                <li>Placeholder: Regular updates and new additions.</li>
                <li>Placeholder: Priority support (if applicable).</li>
                <li>Placeholder: Ad-free experience (if applicable).</li>
              </ul>
            </DetailSection>
            <DetailSection title="Billing & Access" icon={CalendarDaysIcon}>
              <p>Placeholder: This is a recurring subscription, billed {product.price ? 'monthly' : 'periodically'}. You can manage or cancel your subscription anytime from your account dashboard. Instant access upon successful payment.</p>
            </DetailSection>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center text-sm font-medium text-[#8F87F1] hover:text-opacity-80 hover:text-[#8F87F1] transition-colors group"
        >
            <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back
        </button>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg border border-gray-200"
              />
              {/* Bestseller/Popular tag removed from here as per global ProductCard change */}
            </div>

            <div className="flex flex-col h-full">
              <span className="inline-block bg-[#8F87F1]/20 text-[#8F87F1] text-xs font-semibold px-2.5 py-1 rounded-full uppercase mb-3 self-start">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">{product.name}</h1>
              
              <p className="text-4xl font-extrabold text-[#8F87F1] mb-5">
                ৳{product.price.toLocaleString()}
                {product.category === ProductCategoryName.SUBSCRIPTION && <span className="text-lg font-medium text-gray-500">/month</span>}
              </p>

              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                {product.description}
              </p>

              <div className="mt-auto space-y-6"> 
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-md shadow-sm overflow-hidden">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={quantity <=1}
                      aria-label="Decrease quantity"
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg></button>
                    <input 
                      type="number" 
                      id="quantity"
                      name="quantity"
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value,10) || 1))}
                      className="w-16 text-center border-x border-gray-300 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                      min="1"
                      aria-label="Product quantity"
                    />
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
                      aria-label="Increase quantity"
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg></button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white font-semibold py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 text-base"
                >
                  <CartIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                
                <div className="text-sm text-gray-600">
                   {product.stock && product.stock > 0 && <p>Availability: <span className="font-medium text-gray-700">{product.stock} units in stock</span></p>}
                   {(!product.stock || product.stock === 0) && (product.category === ProductCategoryName.COURSE || product.category === ProductCategoryName.EBOOK || product.category === ProductCategoryName.SUBSCRIPTION || product.category === ProductCategoryName.SOFTWARE) && (
                      <p>Availability: <span className="font-medium text-gray-700">Instant Access / Digital Delivery</span></p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 md:mt-12">
            <DetailSection title="Detailed Overview" icon={InfoIcon}>
              <p className="whitespace-pre-line">{product.details || "No detailed overview available for this product."}</p>
            </DetailSection>
            {renderCategorySpecificDetails()}
          </div>

        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-12 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
