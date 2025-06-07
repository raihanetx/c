import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { CartIcon, MenuIcon, CloseIcon } from './icons';
import { SearchBar } from './SearchBar';
import { DESKTOP_HEADER_NAV_LINKS, MOBILE_NAV_LINKS } from '../constants';

const NEW_LOGO_URL = "https://i.postimg.cc/4NtztqPt/IMG-20250603-130207-removebg-preview-1.png";

export const Header: React.FC = () => {
  const { cart } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex bg-black text-white sticky top-0 z-50 shadow-lg items-center px-4 lg:px-8 py-3"> {/* bg-slate-800 to bg-black */}
        <Link to="/" className="flex items-center">
          <img src={NEW_LOGO_URL} alt="Think Plus BD Logo" className="h-12 w-auto" />
        </Link>
        
        <div className="flex-grow mx-8 lg:mx-16">
          <SearchBar placeholder="Search products..." className="max-w-xl mx-auto" />
        </div>

        <nav className="flex items-center space-x-5">
          {DESKTOP_HEADER_NAV_LINKS.map(link => (
            <Link key={link.path} to={link.path} className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1.5 px-3 py-2 rounded-md hover:bg-gray-800"> {/* text-slate-300 to text-gray-300, hover:bg-slate-700 to hover:bg-gray-800 */}
              {link.icon && <link.icon className="h-5 w-5" />}
              <span>{link.label}</span>
            </Link>
          ))}
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1.5 px-3 py-2 rounded-md hover:bg-gray-800"> {/* text-slate-300 to text-gray-300, hover:bg-slate-700 to hover:bg-gray-800 */}
            <CartIcon className="h-6 w-6" />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8F87F1] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white text-black sticky top-0 z-50 shadow-md"> {/* text-slate-800 to text-black */}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={NEW_LOGO_URL} alt="Think Plus BD Logo" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center space-x-3">
            <Link to="/cart" className="relative text-gray-600 hover:text-[#8F87F1] p-2"> {/* text-slate-600 to text-gray-600 */}
              <CartIcon className="h-7 w-7" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#8F87F1] text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-[#8F87F1] p-2"> {/* text-slate-600 to text-gray-600 */}
              {isMobileMenuOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
            </button>
          </div>
        </div>
        {/* Mobile Search Bar - Placed below header elements */}
        <div className="px-4 pb-3 border-b border-gray-200"> {/* border-slate-200 to border-gray-200 */}
           <SearchBar placeholder="Search..." hasBackground={false} />
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl z-40 pb-4 border-t border-gray-200"> {/* border-slate-200 to border-gray-200 */}
            <nav className="flex flex-col space-y-1 p-4">
              {MOBILE_NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-[#8F87F1]/10 hover:text-[#8F87F1] rounded-md transition-colors duration-200 font-medium" // text-slate-700 to text-gray-700
                >
                  {link.icon && <link.icon className="h-6 w-6" />}
                  <span>{link.label}</span>
                </Link>
              ))}
               <hr className="my-2 border-gray-200"/> {/* border-slate-200 to border-gray-200 */}
                {DESKTOP_HEADER_NAV_LINKS.filter(l => l.label !== "All Products" && l.label !== "My Orders").map(link => ( 
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-[#8F87F1]/10 hover:text-[#8F87F1] rounded-md transition-colors duration-200 font-medium" // text-slate-700 to text-gray-700
                  >
                  {link.icon && <link.icon className="h-6 w-6" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};