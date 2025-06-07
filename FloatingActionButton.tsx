
import React from 'react';
import { ChatBubbleIcon } from './icons'; // Changed from HeadphonesIcon, CloseIcon
// CONTACT_INFO might not be needed directly here anymore unless the action uses it.

export const FloatingActionButton: React.FC = () => {
  const handleFabClick = () => {
    // Placeholder for actual support/chat functionality
    alert("Support chat coming soon!"); 
    // Example: navigate('/support-chat'); or open a chat modal
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
      <button
        onClick={handleFabClick}
        className="w-16 h-16 bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white rounded-full flex items-center justify-center shadow-xl focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:ring-offset-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
        aria-label="Open support chat"
      >
        <ChatBubbleIcon className="h-8 w-8" />
      </button>
    </div>
  );
};
