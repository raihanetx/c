
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // For actions like "View All" button
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, children }) => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">{title}</h2> {/* text-slate-800 to text-black */}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>} {/* text-slate-500 to text-gray-500 */}
        </div>
        {children && <div className="mt-3 sm:mt-0">{children}</div>}
      </div>
      <hr className="mt-3 border-gray-200"/> {/* border-slate-200 to border-gray-200 */}
    </div>
  );
};