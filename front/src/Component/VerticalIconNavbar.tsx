import React from 'react';
import { Search, DollarSign, Settings, Home, Recycle } from 'lucide-react';

const VerticalIconNavbar: React.FC = () => {
  return (
    <nav className="flex flex-col items-center w-16 h-screen bg-white border-r border-gray-200 py-4">
      <div className="mb-8">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-600">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col space-y-6">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Search className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <DollarSign className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Home className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Recycle className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </nav>
  );
};

export default VerticalIconNavbar;