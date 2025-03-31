
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <span className="text-4xl">🙄</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium transition-colors hover:bg-orange-600"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
