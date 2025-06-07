import React from 'react';
import { NavLink } from 'react-router-dom';
import { MOBILE_NAV_LINKS } from '../constants';
import { useAppContext } from '../contexts/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { cart } = useAppContext();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-top z-40"> {/* border-slate-200 to border-gray-200 */}
      <div className="container mx-auto flex justify-around items-center h-16">
        {MOBILE_NAV_LINKS.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-0.5 p-2 rounded-md transition-colors duration-200 w-1/3
               ${isActive ? 'text-[#8F87F1]' : 'text-gray-500 hover:text-[#8F87F1]'}` // text-slate-500 to text-gray-500
            }
          >
            {link.icon && <link.icon className="h-6 w-6" />}
            <span className="text-xs font-medium">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};