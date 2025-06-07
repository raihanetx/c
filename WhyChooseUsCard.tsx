import React from 'react';
import { WhyChooseUsItem } from '../types';

interface WhyChooseUsCardProps {
  item: WhyChooseUsItem;
}

export const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({ item }) => {
  const IconComponent = item.icon;
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full">
      <div className="mb-4 p-3 bg-[#8F87F1]/20 rounded-full">
        <IconComponent className="h-8 w-8 text-[#8F87F1]" />
      </div>
      <h3 className="text-md font-semibold text-gray-700 mb-2">{item.title}</h3> {/* text-slate-700 to text-gray-700 */}
      <p className="text-sm text-gray-500 flex-grow">{item.description}</p> {/* text-slate-500 to text-gray-500 */}
    </div>
  );
};