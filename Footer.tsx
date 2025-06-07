import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO, IMPORTANT_LINKS } from '../constants';
import { MailIcon, PhoneIcon } from './icons'; 

const NEW_LOGO_URL = "https://i.postimg.cc/4NtztqPt/IMG-20250603-130207-removebg-preview-1.png";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-8"> {/* bg-slate-800 to bg-black, text-slate-300 to text-gray-300 */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={NEW_LOGO_URL} alt="Think Plus BD Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-sm">
              Your one-stop destination for premium digital products and services.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm mb-2 flex items-start">
              <PhoneIcon className="h-5 w-5 mr-2 mt-0.5 text-[#8F87F1] flex-shrink-0" /> {/* text-[#a29bf3] to text-[#8F87F1] */}
              <span>{CONTACT_INFO.phone}</span>
            </p>
            <p className="text-sm mb-2 flex items-start">
              <MailIcon className="h-5 w-5 mr-2 mt-0.5 text-[#8F87F1] flex-shrink-0" /> {/* text-[#a29bf3] to text-[#8F87F1] */}
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#8F87F1] transition-colors"> {/* hover:text-[#a29bf3] to hover:text-[#8F87F1] */}
                {CONTACT_INFO.email}
              </a>
            </p>
            <p className="text-sm flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#8F87F1] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> {/* text-[#a29bf3] to text-[#8F87F1] */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{CONTACT_INFO.address}</span>
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Important Links</h3>
            <ul className="space-y-2">
              {IMPORTANT_LINKS.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm hover:text-[#8F87F1] transition-colors duration-200 flex items-center" // hover:text-[#a29bf3] to hover:text-[#8F87F1]
                  >
                    {link.icon && <link.icon className="h-4 w-4 mr-2 text-[#8F87F1]" />} {/* text-[#a29bf3] to text-[#8F87F1] */}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter/Social (Optional Placeholder) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
            <p className="text-sm mb-3">Subscribe to our newsletter for updates.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-sm text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#8F87F1]" /> {/* text-slate-800 to text-black */}
              <button type="submit" className="bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white px-4 py-2 rounded-r-md transition-colors"> {/* hover:bg-[#7c71d0] to hover:bg-opacity-90 hover:bg-[#8F87F1] */}
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm"> {/* border-slate-700 to border-gray-700 */}
          <p>&copy; {new Date().getFullYear()} THINK PLUS BD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};