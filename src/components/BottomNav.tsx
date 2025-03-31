
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Award, List, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Courses', path: '/', icon: <BookOpen size={20} /> },
    { name: 'Certificates', path: '/certificates', icon: <Award size={20} /> },
    { name: 'Quizzes', path: '/quizzes', icon: <List size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl border-t z-10">
      <div className="flex justify-around items-center px-2 py-2 md:py-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-colors",
              location.pathname === item.path 
                ? "text-orange-500 bg-orange-50" 
                : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
