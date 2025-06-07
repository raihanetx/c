import React, { useState, useEffect } from 'react';
import { SearchIcon } from './icons';
import { useAppContext } from '../contexts/AppContext';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  hasBackground?: boolean; 
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search premium digital products...", 
  className = "",
  hasBackground = true,
}) => {
  const { searchTerm, setSearchTerm } = useAppContext();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(localSearchTerm);
  };
  
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="search"
        value={localSearchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full py-2.5 pl-10 pr-4 text-sm text-gray-700 ${hasBackground ? 'bg-white' : 'bg-transparent'} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:border-[#8F87F1] shadow-sm`} // text-slate-700 to text-gray-700, border-slate-300 to border-gray-300
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" /> {/* text-slate-400 to text-gray-400 */}
      </div>
    </form>
  );
};